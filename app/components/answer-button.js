import React from 'react';
import '../stylesheets/answer-question.scss';
import { Button } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
class AnswerButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.revealStyle = this.revealStyle.bind(this);
   }

  revealStyle(answered, correct) {
    if (answered !== false) { // 'if (answered)' is false for answered === 0, what is not desired
      if (correct) {
        return {
          color: '#FFFFFF',
          backgroundColor: '#2ECC40'
        };
      } else if (answered === this.props.id) {
        return {
          color: '#FFFFFF',
          backgroundColor: '#A90000'
        };
      }
    }
  }
  
  render() {
    bootstrapUtils.addStyle(Button, 'custom');

    return (
      <Button
        onClick={ this.props.onClick }
        bsStyle='custom'
        style={ this.revealStyle(this.props.answered, this.props.correct) }
        disabled={ this.props.answered !== false }
      >
        { this.props.text }
      </Button>
    )
  }
}

AnswerButton.defaultProps = {
  correct: false
};

export default AnswerButton;
