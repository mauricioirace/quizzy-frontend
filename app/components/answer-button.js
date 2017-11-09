import React from 'react';
import '../stylesheets/answer-question.scss';
import { Button } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import PropTypes from 'prop-types';

class AnswerButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.revealStyle = this.revealStyle.bind(this);
   }

  revealStyle(answered, correct) {
    if (answered !== false) { // 'if (answered)' is false for answered === 0, what is not desired
      if (correct) {
        return 'correct'
      } else if (answered === this.props.id) {
        return 'wrong';
      }
    } else {
      return 'custom';
    }
  }

  render() {
    bootstrapUtils.addStyle(Button, 'custom');
    bootstrapUtils.addStyle(Button, 'correct');
    bootstrapUtils.addStyle(Button, 'wrong');

    return (
      <Button
        onClick={ this.props.onClick }
        bsStyle={ this.revealStyle(this.props.answered, this.props.correct) }
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

AnswerButton.propTypes = {
  answered: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  correct: PropTypes.bool,
  onClick: PropTypes.func,
  key: PropTypes.number,
  id: PropTypes.number,
  text: PropTypes.string,
};

export default AnswerButton;
