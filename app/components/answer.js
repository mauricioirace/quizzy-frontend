import React from 'react';

class Answer extends React.PureComponent {

  render() {
    return this.props.correct ? (<h3> { this.props.text } </h3>) : (<p> { this.props.text } </p>);
  }
}

export default Answer;
