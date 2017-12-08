import React from 'react';
import PropTypes from 'prop-types';
import { Button, ControlLabel, Thumbnail, Col, Grid, Row } from 'react-bootstrap';
import { SlideFadeDelayed, SlideFadeRight } from './transitions';
import { Icon } from 'react-fa';
import '../stylesheets/question-hint.scss';

class QuestionHint extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.hint !== '') {
      if (!this.props.hintUsed) {
        return (
          <div className='hint'>
            { this.props.stop !== false 
              ? null 
              : <h4 id='arAnswer' onClick={ this.props.showHint }>Hint available <Icon name='lightbulb-o' className='icon'  /></h4> 
            }
          </div>
        )
      } else {
        return (
          <div className='hint'>
            <h4>Hint: <i>{ this.props.hint }</i></h4>
          </div>
        )
      }
    } else {
      return null
    }
  }
}

QuestionHint.PropTypes = {
  hint: PropTypes.string,
  hintUsed: PropTypes.bool,
  showHint: PropTypes.func,
  stop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
}
export default QuestionHint;
