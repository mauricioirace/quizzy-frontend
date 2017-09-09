import React from 'react';

class Answer extends React.PureComponent {

  render() {
    return this.props.correct
        ? (<p> { this.props.text } </p>)
        : (<h1> { this.props.text } </h1>);
  }
}

export default Answer;
