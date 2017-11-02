import React from 'react';
import Answer from './answer';
import { connect } from 'react-redux';
import {
  changeQuestionName,
  changeQuestionDifficulty,
  changeHintQuestion,
  addOrRemoveQuestionAnswer,
  changeSelectedAnswer
} from '../redux/actions/game';
import '../stylesheets/question.scss';
import { Button, ButtonToolbar, ToggleButton, ToggleButtonGroup, Form, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';
import { Icon } from 'react-fa';

const mapDispatchToProps = (dispatch) => {
  return {
    changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index)),
    changeQuestionDifficulty: (newDifficulty, index) => dispatch(changeQuestionDifficulty(newDifficulty, index)),
    changeHintQuestion: (newHint, index) => dispatch(changeHintQuestion(newHint, index)),
    addOrRemoveQuestionAnswer: (answers, index) => dispatch(addOrRemoveQuestionAnswer(answers, index)),
    changeSelectedAnswer: (question, answer) => dispatch(changeSelectedAnswer(question, answer)),
  };
};

const mapStateToProps = (state,props) => {
  return {
    self: state.gameData.questions[props.id]
  };
};

class Question extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      textMessage: '',
      answerMessage: '',
      validateTextField: false,
      validateAnswerFields: false,
      text: this.props.obj.text,
      hint: this.props.obj.hint,
      difficulty: this.props.obj.difficulty,
      answers: this.props.obj.answers,
      correctAnswer: this.props.obj.correctAnswer
    };
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.changeHint = this.changeHint.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleEnterOnAnswer = this.handleEnterOnAnswer.bind(this);
    this.validateQuestion = this.validateQuestion.bind(this);
    this.validateAnswers = this.validateAnswers.bind(this);
  }

  changeQuestion(event) {
    this.props.hideAlert();    
    this.setState({ text: event.target.value });
  }

  changeHint(event){
    this.props.hideAlert();    
    this.setState({ hint: event.target.value });
  }

  changeDifficulty (event) {
    this.props.hideAlert();    
    this.setState({ difficulty: event });
  }

  addAnswer() {
    if (this.validateAnswers()){
      if (this.props.obj.answers.length < 6) {
        const newAnswers = this.props.obj.answers.slice(0, 6);
        newAnswers.push({ 'answer': '' });
        this.props.addOrRemoveQuestionAnswer(newAnswers, this.props.id);
        this.props.hideAlert();      
      } else {
        this.props.showAlert("The question can't have more than six answers.");
      }
    }
  }

  removeAnswer(index) {
    if (this.props.obj.answers.length > 2) {
      const newAnswers = this.props.obj.answers.slice(0, 6);
      newAnswers.splice(index, 1);
      this.props.addOrRemoveQuestionAnswer(newAnswers, this.props.id);
      this.props.hideAlert();
    } else {
      this.props.showAlert("The question must have at least two answers.");      
    }
  }

  rollbackState(question) {
    this.setState({
      text: question.text,
      hint: question.hint,
      difficulty: question.difficulty
    });
  }

  cancelChanges() {
    this.props.hideAlert();    
    if (this.props.obj.text === '') {
      this.props.removeQuestion(this.props.id)
    } else {
      this.rollbackState(this.props.obj);
      this.props.addOrRemoveQuestionAnswer(this.state.answers, this.props.id);
      this.props.changeSelectedAnswer(this.props.id, this.state.correctAnswer);
      this.props.closePanel();
    }
  }

  saveChanges() {
    this.props.hideAlert();
    if ((this.validateQuestion()) && (this.validateAnswers())){
      if (this.state.difficulty === '') {
        this.props.showAlert("You must select the difficulty.");   
      } else if (this.props.obj.correctAnswer === -1) {
        this.props.showAlert("You must select a correct answer.");        
      } else {
        this.setState({ answers: this.props.obj.answers });
        this.setState({ correctAnswer: this.props.obj.correctAnswer });
        this.props.changeQuestionName(this.state.text, this.props.id);
        this.props.changeHintQuestion(this.state.hint, this.props.id);
        this.props.changeQuestionDifficulty(this.state.difficulty, this.props.id);
        this.props.closePanel();
      }
    }
  }

  handleEnterOnAnswer(index) {
    if (index === this.props.obj.answers.length - 1) {
      this.addAnswer();  
    }
  }

  validateQuestion() {
    if (this.state.text === '') {
      this.setState({
        validateTextField: true,
        textMessage: "This field can't be empty"
      })
      return false;
    } else {
      this.setState({
        validateTextField: false,
        textMessage: ''
      })
    }
    return true;
  }

  validateAnswers() {
    let valid = true;
    let answers = this.props.obj.answers;
    for (let ans of answers) {
      valid = (valid && (ans.answer !== ''));
    }
    if (valid) {
      this.setState({
        validateAnswerFields: false,
        answerMessage: '',
      });
    } else {
      this.setState({
        validateAnswerFields: true,
        answerMessage: "These fields can't be empty",
      })
      return false;
    }
    return true;
  }

  getAnswerValidationState(question, index) {
    if (this.state.validateAnswerFields) {
      if (question.answers[index].answer === '') {
        return 'error'
      }
    }
    return null
  }

  getTextValidationState() {
    if (this.state.validateTextField) {
      if (this.state.text === '') {
        return 'error'
      }
    }
    return null
  }

  render() {
    const question = this.props.self;
    const id = this.props.id;
    const answers = [];
    question.answers.forEach( (answer, index) => {
      answers.push(
        <FormGroup validationState = { this.getAnswerValidationState(question, index) }>
          <Answer
            id={ index }
            key={ index }
            question={ id }
            text={ answer.answer }
            correct={ question.correctAnswer == index }
            addAnswer={ this.addAnswer }
            hideAlert={ this.props.hideAlert }
            removeAnswer={ this.removeAnswer }
            handleEnter={ this.handleEnterOnAnswer }
          />
        </FormGroup>
      );
    });

    return (
      <div className='question'>
        <FormGroup
          validationState = { this.getTextValidationState() }>
          <InputGroup>
            <FormControl
              type='text'
              onChange={ this.changeQuestion }
              value={ this.state.text }
              placeholder={ 'Question text' }
            />
            <InputGroup.Addon>?</InputGroup.Addon>
          </InputGroup>
          <span className='help-block'>{ this.state.textMessage }</span>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Hint (optional):</ControlLabel>
          <InputGroup>
            <FormControl
              type='text'
              onChange={ this.changeHint }
              value={ this.state.hint }
              placeholder={ 'Question hint' }
            />
            <InputGroup.Addon>
              <Icon name='lightbulb-o'/>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Difficulty:</ControlLabel>
          <ButtonToolbar>
            <ToggleButtonGroup justified type="radio" name="options" checked={ this.state.difficulty } onChange={ this.changeDifficulty }>
              <ToggleButton value='Easy'>Easy</ToggleButton>
              <ToggleButton value='Medium'>Medium</ToggleButton>
              <ToggleButton value='Hard'>Hard</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </FormGroup>
          <ControlLabel>Answers:</ControlLabel>
          { answers }
        <FormGroup validationState = { this.state.validAnswer }>
         <span className='help-block'>{ this.state.answerMessage }</span>
        </FormGroup>
        <div>
          <a id='arAnswer' onClick={ this.addAnswer }>Add answer</a>
        </div>
        <div>
          <Button className='default' className='pull-right' onClick={ this.saveChanges.bind(this) } id='savedelete'>Save</Button>
          <Button className='default' className='pull-right' onClick={ this.cancelChanges.bind(this) } id='savedelete'>Cancel</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
