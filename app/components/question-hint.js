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

  renderHint() {
    return (
      <ControlLabel>{ this.props.question.hint }</ControlLabel>
    )
  }

  render() {

    if (this.props.hint !== '') {
      if (!this.props.hintUsed) {
        return (
          <Grid>
            <Row>
              <SlideFadeRight in={ this.props.stop === false }>          
                <Col xs={6} md={4}>
                  <Thumbnail className='hint-hidden'>
                    <h4>Hint available <Icon name='lightbulb-o' className='icon'/></h4>
                    <hr className='divider'/>
                    <p>Keep in mind that you will receive less points if used.</p>
                    <p>
                      <Button bsStyle="primary" onClick={ this.props.showHint } disabled={ this.props.stop !== false }>
                        Show me the hint!
                      </Button>
                    </p>
                  </Thumbnail>
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
                    <h4>Good luck! <Icon name='lightbulb-o' className='icon'/></h4>
                    <hr className='divider'/>                    
                    <p>Hint: <i>{ this.props.hint }</i></p>                   
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
