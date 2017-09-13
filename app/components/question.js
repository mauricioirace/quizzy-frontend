import React from 'react';
import Answer from './answer';

class Question extends React.PureComponent {
  constructor(props){
    super(props);
  }

  removeQuestion(){
    const id = this.props.id;
    this.props.onRemoveQuestion(id);
  }

  render() {
    const question = this.props.obj;
    const id = this.props.id;
    const answers = [];
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
        <input type='text' placeholder={ question.text } />
        Difficulty
        <select>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='challenging'>Challenging</option>
        </select> 
        <button onClick={this.removeQuestion.bind(this)}> X </button>
        <br/>
        <ul>
          { answers }
        </ul>
      </li>
    );
  }
}

export default Question;
