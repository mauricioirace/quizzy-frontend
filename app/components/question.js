import React from 'react';
import Answer from './answer';
import { connect } from 'react-redux';
import { changeQuestionName, changeQuestionDifficulty } from '../redux/actions/game';
import '../stylesheets/question.scss';
import { Row, Col, Form, FormGroup, FormControl, Button, 
  Glyphicon, FieldGroup, ControlLabel, InputGroup } from 'react-bootstrap';

const mapDispatchToProps = (dispatch) => {
    return {
      changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index)),
      changeQuestionDifficulty: (newDifficulty, index) => dispatch(changeQuestionDifficulty(newDifficulty, index)),
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
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  changeQuestion(event) {
    this.props.changeQuestionName(event.target.value, this.props.id);
  }

  changeDifficulty (event) {
    this.props.changeQuestionDifficulty(event.target.value, this.props.id);
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
          text={ answer }
          correct={ question.correctAnswer == index }
          question={ id }
        />);
    });

    return (
      <div className='question'>

        <FormGroup>
          <InputGroup>
          <FormControl
            type='text'
            onChange={ this.changeQuestion }
            value={ question.text }
            placeholder={ 'Question text' }
          /> {' '}
          <InputGroup.Addon>
            ?
          </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>             
          <ControlLabel>Difficulty:</ControlLabel>
          <FormControl componentClass="select" onChange={ this.changeDifficulty } 
          value={ this.props.self.difficulty }>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='challenging'>Challenging</option>
          </FormControl>
        </FormGroup>             

        <FormGroup>               
          <ControlLabel>Answers:</ControlLabel>
            { answers }
        </FormGroup>               

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
