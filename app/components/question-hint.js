import React from 'react';
import PropTypes from 'prop-types';
import { Button, ControlLabel, ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap';
import '../stylesheets/question-hint.scss';

class QuestionHint extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
        
    const popoverBottom = (
      <Popover id="popover-positioned-bottom" title="Popover bottom">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );
    
    const popoverRight = (
      <Popover
        id="popover-basic"
        placement="right"
        title="Popover right"
      >
        And here's some <strong>amazing</strong> content. It's very engaging. right?
      </Popover>
    );

    if (this.props.question.hint !== '') {
      return (
        <div>
          <Button onClick={ this.props.showHint }>Help!</Button>
          { this.props.hintUsed ? <ControlLabel>{ this.props.question.hint }</ControlLabel> : null }

          <ButtonToolbar>
            <OverlayTrigger trigger="click" placement="bottom" overlay={ popoverBottom }>
              <Button>Holy guacamole!</Button>
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="right" overlay={ popoverRight }>
              <Button>Holy guacamole!</Button>
            </OverlayTrigger>
          </ButtonToolbar>

        </div>
      )
    } else {
      return null
    }
  }
}

// QuestionHint.PropTypes = {
//   total: PropTypes.number,
//   onTimeout: PropTypes.func,
//   correct: PropTypes.bool,
//   stop: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.bool
//   ]),
//   seconds: PropTypes.number,
//   text: PropTypes.string,
// }
export default QuestionHint;
