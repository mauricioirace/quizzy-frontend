import React, { PropTypes } from 'react';
import Question from './question';
import Scroll from 'react-scroll';
import { Button, Col, Row, Form, ControlLabel,
  FormControl, Panel, Thumbnail, Grid, DropdownButton, MenuItem } from 'react-bootstrap';

class Questions extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  constructor(props){
    super(props);
    this.state = {
      showPanel: false,
      editIndex: 0
    };
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onEditQuestion = this.onEditQuestion.bind(this);
    this.openPanel = this.openPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
  }

  onAddQuestion() {
    this.props.addQuestion();
    this.onEditQuestion(this.props.questions.length);
  }

  onEditQuestion(index) {
    this.setState({ editIndex: index });
    this.openPanel();
  }

  onRemoveQuestion(index) {
    this.props.removeQuestion(index);
    this.closePanel();
  }

  scrollToBottom() {
    Scroll.animateScroll.scrollToBottom();
  }

  openPanel() {
    this.props.disableStepButtons();
    this.setState({ showPanel: true });
  }

  closePanel() {
    this.props.enableStepButtons();
    this.setState({ showPanel: false });
  }

  renderQuestions(questions) {
    const list = [];

    questions.map( (question, index) => {
      const text = <FormControl disabled type='text' key={ index } value={ question.props.obj.text } placeholder={ 'Question #' + (index + 1) }/>;
      let difficulty = <ControlLabel> { question.props.obj.difficulty.toUpperCase() } </ControlLabel>
      list.push(
        <div id='questionSquare' >
          <Col xs={2} md={2}>
            <Thumbnail  className='thumbnail' id={ question.props.obj.difficulty }>
              <DropdownButton bsSize='xsmall' title='' id='bg-vertical-dropdown'>
                <MenuItem eventKey='1' onClick={ () => this.onEditQuestion(index) } >Edit</MenuItem>
                <MenuItem eventKey='2' onClick={ () => this.onRemoveQuestion(index) } >Delete</MenuItem>
              </DropdownButton>
              <h3> { difficulty } </h3>
              <p> { text } </p>
            </Thumbnail>
          </Col>
        </div>
      );
    });
    return list;
  }

  render() {
    let currentItem = this.state.editIndex;
    let title = 'Question #' + (currentItem + 1);
    let questions = this.props.questions.map( (question, index) =>
      <Question key={ index } id={ index } obj={ question } edit={ () => this.onEditQuestion } closePanel={ this.closePanel } />
    );
    const displayQuestions = this.renderQuestions(questions);

    return (
      <div>
        <Grid>
          <Row>
            { this.renderQuestions(questions) }
            <Col xs={2} md={2}>
              <Thumbnail onClick={ this.onAddQuestion } className='thumbnail' id='addQuestion'>
                <h3>Add+</h3>
              </Thumbnail>
            </Col>
          </Row>
        </Grid>

        <Panel collapsible expanded={ this.state.showPanel }  eventKey='1'>
          <div>
            <strong>{ title }</strong>
          </div>
          <hr/>
          { questions[currentItem] }
          <div>
            <Button bsStyle='default pull-right' onClick={ this.closePanel } id='savedelete'>Save</Button>
            <Button bsStyle='default pull-right' onClick={ () => this.onRemoveQuestion(currentItem) } id='savedelete'>Cancel</Button>
          </div>
        </Panel>
      </div>
    );
  }
}

export default Questions;
