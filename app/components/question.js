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
import { Button, Form, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';
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
      text: this.props.obj.text,
      hint: this.props.obj.hint,
      difficulty: this.props.obj.difficulty,
      validText: '',
      textMessage: '',
      validAnswer: '',
      answerMessage: '',
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
  }

  changeQuestion(event) {
    this.setState({ text: event.target.value });
  }

  changeHint(event){
    this.setState({ hint: event.target.value });
  }

  changeDifficulty (event) {
    this.setState({ difficulty: event.target.value });
  }

  addAnswer() {
    if (this.props.obj.answers.length < 6) {
      const newAnswers = this.props.obj.answers.slice(0, 6);
      newAnswers.push({ 'answer': '' });
      this.props.addOrRemoveQuestionAnswer(newAnswers, this.props.id);
    } else {
      alert("The question can't have more than six answers");
    }
  }

  removeAnswer(index) {
    if (this.props.obj.answers.length > 2) {
      const newAnswers = this.props.obj.answers.slice(0, 6);
      newAnswers.splice(index, 1);
      this.props.addOrRemoveQuestionAnswer(newAnswers, this.props.id);
    } else {
      alert('The question must have at least two answers');
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
    if (this.props.obj.text == '') {
      this.props.removeQuestion(this.props.id)
    } else {
      this.rollbackState(this.props.obj);
      this.props.addOrRemoveQuestionAnswer(this.state.answers, this.props.id);
      this.props.changeSelectedAnswer(this.props.id, this.state.correctAnswer);
      this.props.closePanel();
    }
  }

  saveChanges() {
    this.setState({ answers: this.props.obj.answers });
    this.setState({ correctAnswer: this.props.obj.correctAnswer });
    this.props.changeQuestionName(this.state.text, this.props.id);
    this.props.changeHintQuestion(this.state.hint, this.props.id);
    this.props.changeQuestionDifficulty(this.state.difficulty, this.props.id);
    this.props.closePanel();
  }

  handleEnterOnAnswer(index) {
    if (index === this.props.obj.answers.length - 1) {
      this.addAnswer();  
    }
  }

  validateQuestion() {
    if (this.state.text == '') {
      this.setState({
        validText: 'error',
        textMessage: "This field can't be empty"
      })
      return;
    } else {
      this.setState({
        validText: 'success',
        textMessage: ''
      })
      var valid = true;
      for (var i = 0; i < this.props.obj.answers.length; i++) {
        valid = valid && ((this.props.obj.answers[i].answer != ''));
      }
      if (valid) {
        this.setState({
          validAnswer: 'success',
          answerMessage: '',
        });
      } else {
        this.setState({
          validAnswer: 'error',
          answerMessage: "These fields can't be empty",
        })
        return
      }
      this.saveChanges();
    }
  }

//Valido las respuestas
validateAnswer() {
  var valid = true;
  for (var i = 0; i < this.props.obj.answers.length; i++) {
    valid = valid && ((this.props.obj.answers[i].answer != ''));
  }
  if (valid) {
    this.setState({
      validAnswer: '',
      answerMessage: '',
    });
  } else {
    this.setState({
      validAnswer: 'error',
      answerMessage: "These fields can't be empty",
    })
    return
  }
  this.addAnswer()
}

  render() {
    const question = this.props.self;
    const id = this.props.id;
    const answers = [];
    question.answers.forEach( (answer, index) => {
      answers.push(
        <Answer
          key={ index }
          id={ index }
          text={ answer.answer }
          correct={ question.correctAnswer == index }
          question={ id }
          addAnswer={ this.addAnswer }
          removeAnswer={ this.removeAnswer }
          handleEnter={ this.handleEnterOnAnswer }
        />
      );
    });

    return (
      <div className='question'>
        <FormGroup
          validationState = { this.state.validText }>
          <InputGroup>
            <FormControl
              type='text'
              onChange={ this.changeQuestion }
              value={ this.state.text }
              placeholder={ 'Question text' }
            />
            <InputGroup.Addon>?</InputGroup.Addon>
          </InputGroup>
          <span className="help-block">{ this.state.textMessage }</span>
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
          <FormControl componentClass='select' onChange={ this.changeDifficulty }
          value={ this.state.difficulty }>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </FormControl>
        </FormGroup>
        <FormGroup
          validationState = { this.state.validAnswer }>
          <ControlLabel>Answers:</ControlLabel>
            { answers }
         <span className="help-block">{ this.state.answerMessage }</span>
        </FormGroup>
        <div>
          <a id="arAnswer" onClick={ this.validateAnswer.bind(this)}>Add answer</a>
        </div>
        <div>
          <Button className='default pull-right' onClick={ this.validateQuestion.bind(this) } id='savedelete'>Save</Button>
          <Button className='default pull-right' onClick={ this.cancelChanges.bind(this) } id='savedelete'>Cancel</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
