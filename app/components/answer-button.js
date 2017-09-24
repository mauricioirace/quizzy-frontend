import React from 'react';
import '../stylesheets/question.scss';
import { Button } from 'react-bootstrap';

class AnswerButton extends React.PureComponent {
  constructor(props) {
    super(props);
   }

  render() {
    return (
      <Button> { this.props.text } </Button>
    )
  }
}


AnswerButton.defaultProps = {
  correct: false
};

export default AnswerButton;
