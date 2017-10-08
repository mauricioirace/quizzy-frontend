import React, { PropTypes } from 'react';
import Question from './question';
import Scroll from 'react-scroll';
import { Button, Col, Row, Form, FormGroup, ControlLabel, FormControl, PageHeader, Well, InputGroup,
  Glyphicon, Panel,  Thumbnail, Grid, Carousel, PanelGroup } from 'react-bootstrap';
import { TileLayout, TileLayoutItem } from 'pivotal-ui/react/tile-layout'; 
import { Panels, ClickableAltPanel } from 'pivotal-ui/react/panels';

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
        <TileLayoutItem>
          <ClickableAltPanel onClick={ () => this.onEditQuestion(index) }> { difficulty } { text } </ClickableAltPanel>
        </TileLayoutItem>
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
        <div>
          <TileLayout columns={ 5 }>
            { displayQuestions }
            <TileLayoutItem>
              <ClickableAltPanel onClick={ this.onAddQuestion }> NEW QUESTION </ClickableAltPanel>
            </TileLayoutItem>
          </TileLayout>
        </div>

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
