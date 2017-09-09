import React from 'react';
import Answer from './answer';

// const mapStateToProps = (state) => {
//   return {
//     self
//   };
// };

class Question extends React.PureComponent {
  constructor(props){
    super(props);
    // this.onChange = this.onChange.bind(this);

  }

  render() {
    let q = this.props.obj;
    let id = this.props.id;
    let answers = [];

    q.answers.forEach((a,i) =>{
      answers.push(<Answer key={ i } id={ i } text={ a } correct={ q.correctAnswer === i }/>);
    });

    return (
      <li>
        <input type="text" defaultValue={ q.text } />
        <ul>
          { answers }
        </ul>
      </li>
    );
  }
}

export default Question;
