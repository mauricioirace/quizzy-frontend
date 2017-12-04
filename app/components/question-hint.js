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
          <Grid>
            <Row>
              <SlideFadeRight in={ this.props.stop === false }>          
                <Col xs={6} md={4}>
                  { this.props.stop !== false ? null 
                  : <Thumbnail className='hint-hidden'>
                      <h4>Hint available <Icon name='lightbulb-o' className='icon' id='arAnswer' onClick={ this.props.showHint }/></h4> 
                    </Thumbnail>
                  }
                </Col>
              </SlideFadeRight>
            </Row>
          </Grid>
        )
      } else {
        return (
          <Grid>
            <Row>
              <SlideFadeRight in={ this.props.stop === false }>
                <Col xs={6} md={4}>
                  <Thumbnail className='hint'>
                    <h4>Hint: <i>{ this.props.hint }</i></h4>
                  </Thumbnail>
                </Col>
              </SlideFadeRight>
            </Row>
          </Grid>
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
