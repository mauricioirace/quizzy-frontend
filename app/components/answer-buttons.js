import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/answer-question.scss';
import AnswerButton from './answer-button';
import { ButtonGroup } from 'react-bootstrap';
class AnswerButtons extends React.PureComponent {
  render() {
    return (
      <ButtonGroup vertical block>
        <AnswerButton text="Baby don't hurt me"/>
        <AnswerButton text="Don't hurt me"/>
        <AnswerButton text='No more' correct/>
      </ButtonGroup>
    )
  }
}
export default AnswerButtons;