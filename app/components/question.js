import React from 'react';
import Answer from './answer';

class Question extends React.PureComponent {
  constructor(props){
    super(props);
  }

  removeQuestion(id){
    this.props.onRemoveQuestion(id);
  }

  render() {
    let question = this.props.obj;
    let id = this.props.id;
    let answers = [];
    question.answers.forEach( (answer, index) => {
      answers.push(
        <Answer
          key={ index }
          id={ index }
          text={ answer }
          correct={ question.correctAnswer === index }
          question={ id }
        />);
    });

    return (
      <li>
        <input type='text' defaultValue={ question.text } />
        Difficulty
        <select>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='challenging'>Challenging</option>
        </select> 
        <a href="#" onClick={this.removeQuestion.bind(this, this.props.id)}> X </a>
        <br/>
        <ul>
          { answers }
        </ul>
      </li>
    );
  }
}

export default Question;
