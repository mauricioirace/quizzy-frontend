import React from 'react';
import Answer from './answer';

const mapStateToProps = (state) => {
  return {
    self
  };
};

class Question extends React.PureComponent {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);

  }

  onChange() {


  }

  render() {
    let q = this.props.question;
    let answers = [];
    let i=0;

    q.answers.each((a) =>{
      answers.push(<Answer text={ a } correct={ q.correctAnswer === i }/>);
      i++;
    });

    return (
      <li>
        <input type="text" value={ q.text } onChange={ this.onChange } />
        <ul>
          {answers}
        </ul>
      </li>
    );
  }
}

export default Question;
