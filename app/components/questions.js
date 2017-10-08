import React, { PropTypes } from 'react';
import Question from './question';
import Scroll from 'react-scroll';
import { Button, Col, Row, Form, ControlLabel,
  FormControl, Panel, Thumbnail, Grid } from 'react-bootstrap';

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
    this.scrollToBottom();
  }

  onRemoveQuestion(index) {
    this.props.removeQuestion(index);
    this.closePanel();
  }

  scrollToBottom() {
    Scroll.animateScroll.scrollToBottom();
  }

  renderQuestions(questions) {
    let list = [];

    questions.map( (question, index) => {
      const text = <FormControl disabled type='text' key={ index } value={ question.props.obj.text } placeholder={ 'Question #' + (index + 1) }/>;
      const difficulty = <ControlLabel> { question.props.obj.difficulty.toUpperCase() } </ControlLabel>
      list.push(
        <Col xs={2} md={2}>
          <Thumbnail onClick={ () => this.onEditQuestion(index) } className='thumbnail'>
            <h3>{ difficulty }</h3>
            <p>{ text }</p>
          </Thumbnail>
        </Col>
      );
    });
    return list;
  }

  openPanel() {
    this.setState({ showPanel: true });
  }

  closePanel() {
    this.setState({ showPanel: false });
  }

  render() {
    let currentItem = this.state.editIndex;
    let title = 'Question #' + (currentItem + 1);
    let questions = this.props.questions.map( (question, index) =>
      <Question key={ index } id={ index } obj={ question } edit={ () => this.onEditQuestion }/>
    );
    let displayQuestions = this.renderQuestions(questions);

    return (
      <Form>

        <Grid>
          <Row>
            { displayQuestions }
            <Col xs={2} md={2}>
            <Thumbnail onClick={ this.onAddQuestion } className='thumbnail'>
              <h3>ADD A NEW QUESTION</h3>
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
          <hr/>
          <div>
            <Button bsStyle='default pull-right' onClick={ this.closePanel }>Save</Button>
            <Button bsStyle='default pull-right' onClick={ () => this.onRemoveQuestion(currentItem) }>Delete</Button>
          </div>
        </Panel>
      </Form>
    );
  }
}

export default Questions;
