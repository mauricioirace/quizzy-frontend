import React, { PropTypes } from 'react';
import Question from './question';
import { Button, Col, Row, Form, ControlLabel, Alert,
  FormControl, Panel, Thumbnail, Grid, DropdownButton, MenuItem } from 'react-bootstrap';
import { Icon } from 'react-fa';

class Questions extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  constructor(props){
    super(props);
    this.state = {
      editIndex: 0,
      showPanel: false,
      showAddButton: true,
      disableMenuButton: false
    };
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onEditQuestion = this.onEditQuestion.bind(this);
    this.openPanel = this.openPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this)
  }

  onAddQuestion() {
    this.props.hideAlert();
    this.props.addQuestion();
    this.onEditQuestion(this.props.questions.length);
  }

  onEditQuestion(index) {
    this.props.hideAlert();    
    this.setState({ editIndex: index });
    this.openPanel();
  }

  onRemoveQuestion(index) {
    this.props.hideAlert();    
    this.props.removeQuestion(index);
    this.closePanel();
  }

  openPanel() {
    this.props.disableStepButtons();
    this.setState({
      disableMenuButton: true,
      showAddButton: false,
      showPanel: true
     });
  }

  closePanel() {
    this.props.enableStepButtons();
    this.setState({
      disableMenuButton: false,      
      showAddButton: true,
      showPanel: false
     });
  }

  renderQuestions(questions) {
    const list = [];
    questions.map( (question, index) => {
      const text = question.props.obj.text;
      const difficulty = question.props.obj.difficulty;
      list.push(
        <div id='questionSquare' >
          <Col xs={2} md={2}>
            <Thumbnail  className='thumbnail' id={ question.props.obj.difficulty }>
              {
                this.state.disableMenuButton ? null
                : <div>
                    <Icon name='trash' className='pull-right' id='arAnswer' onClick={ () => this.onRemoveQuestion(index) }/>
                    <Icon name='gear' className='pull-right' id='arAnswer' onClick={ () => this.onEditQuestion(index) }/>
                  </div>
              }
              <h3><ControlLabel>{ difficulty === '' ? 'New question' : difficulty }</ControlLabel></h3>
              <p> 
                <FormControl readOnly type='text' key={ index } value={ text } placeholder={ 'Question #' + (index + 1) }/> 
              </p>
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
      closePanel={ this.closePanel } removeQuestion={ this.onRemoveQuestion } 
      showAlert={ this.props.showAlert } hideAlert={ this.props.hideAlert }
      />
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
