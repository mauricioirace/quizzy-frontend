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
      editIndex: 0,
      showPanel: false,
      showAddButton: true
    };
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onEditQuestion = this.onEditQuestion.bind(this);
    this.openPanel = this.openPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this)
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
    this.setState({
      showAddButton: false,
      showPanel: true
     });
  }

  closePanel() {
    this.props.enableStepButtons();
    this.setState({
      showAddButton: true,
      showPanel: false
     });
  }

  renderQuestions(questions) {
    const list = [];
    questions.map( (question, index) => {
      const text = <FormControl readOnly type='text' key={ index } value={ question.props.obj.text } placeholder={ 'Question #' + (index + 1) }/>;
      let difficulty = <ControlLabel> { question.props.obj.difficulty.toUpperCase() } </ControlLabel>
      list.push(
        <div id='questionSquare' >
          <Col xs={2} md={2}>
            <Thumbnail  className='thumbnail' id={ question.props.obj.difficulty }>
              <h3>
                <DropdownButton bsSize='xsmall' title='' id='bg-vertical-dropdown' bsStyle='pull-right'>
                  <MenuItem eventKey='1' onClick={ () => this.onEditQuestion(index) } >Edit</MenuItem>
                  <MenuItem eventKey='2' onClick={ () => this.onRemoveQuestion(index) } >Delete</MenuItem>
                </DropdownButton>
                { difficulty }
              </h3>
              <p> { text } </p>
            </Thumbnail>
          </Col>
        </div>
      );
    });
    return list;
  }

  renderAddButton() {
    if (this.state.showAddButton) {
      return (
        <Col xs={2} md={2}>
          <Thumbnail onClick={ this.onAddQuestion } className='thumbnail' id='addQuestion'>
            <h3>Add a new question</h3>
          </Thumbnail>
        </Col>
      )
    } else {
      return (
        <Col xs={2} md={2}>
          <Thumbnail className='thumbnail' id='addQuestionDisabled'>
            <h3>Add a new question</h3>
          </Thumbnail>
        </Col>
      )
    }
  }

  render() {
    const currentItem = this.state.editIndex;
    const title = 'Question #' + (currentItem + 1);
    const questions = this.props.questions.map( (question, index) =>
      <Question key={ index } id={ index } obj={ question } edit={ () => this.onEditQuestion }
      closePanel={ this.closePanel } removeQuestion={ this.onRemoveQuestion }/>
    );

    return (
      <div>
        <Grid>
          <Row>
            { this.renderQuestions(questions) }
            { this.renderAddButton() }
          </Row>
        </Grid>

        <Panel collapsible expanded={ this.state.showPanel }  eventKey='1'>
          <div>
            <strong>{ title }</strong>
          </div>
          <hr/>
          { questions[currentItem] }
        </Panel>
      </div>
    );
  }
}

export default Questions;
