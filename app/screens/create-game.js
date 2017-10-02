import React from 'react';
import {
  addQuestion,
  changeCategory,
  changeDescription,
  changeImage,
  changeName,
  createGame,
  removeAllQuestions,
  removeQuestion
} from '../redux/actions/game';
import Questions from '../components/questions';
import Question from '../components/question';
import { connect } from 'react-redux';
import empty from '../../assets/images/empty.svg';
import { withRouter } from 'react-router-dom';
import '../stylesheets/create-game.scss';
import Scroll from 'react-scroll';
import { Button, Col, Row, Form, FormGroup, ControlLabel, FormControl, PageHeader, Well, InputGroup,
  Glyphicon, Panel,  Thumbnail, Grid, Carousel, PanelGroup } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    description: state.gameData.description,
    image: state.gameData.image,
    name: state.gameData.name,
    category: state.gameData.category,
    questions: state.gameData.questions,
    error: state.gameData.error,
    hint: state.gameData.hint
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question) => dispatch(addQuestion(question)),
    removeQuestion: (question) => dispatch(removeQuestion(question)),
    removeAllQuestions: () => dispatch(removeAllQuestions()),
    changeImage: (image) => dispatch(changeImage(image)),
    changeDescription: (name) => dispatch(changeDescription(name)),
    changeName: (name) => dispatch(changeName(name)),
    changeCategory: (category) => dispatch(changeCategory(category)),
    createGame: (game,onSuccess) => dispatch(createGame(game,onSuccess)),
    changeHint: (hint) => dispatch(changeHint(hint)),
  };
};

const question = () => {
  return {
    text: '',
    hint: '',
    difficulty: 'Easy',
    answers: [ { 'answer': '' }, { 'answer': '' } ],
    correctAnswer: 0
  };
};

class CreateGame extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showPanel: false,
      editIndex: 0
    };
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.openPanel = this.openPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.onEditQuestion = this.onEditQuestion.bind(this);
  }

  onDone() {
    const { name, description,
      category, questions , image} = this.props;
    const game = {
      creator: 'Fulane of such',
      name,
      description,
      tags: [ category ],
      questions,
      image
    };
    this.props.createGame(game,this.onSuccess);
  }

  onSuccess(){
    this.props.history.push('/');
  }

  componentWillMount() {
    // remove all questions
    this.props.removeAllQuestions();
  }

  componentWillUnmount() {
    // remove all questions
    this.props.removeAllQuestions();
  }

  onAddQuestion() {
    let indexWhereAdd = this.props.questions.length;
    this.props.addQuestion(question(indexWhereAdd));
    this.onEditQuestion(indexWhereAdd);
    this.scrollToBottom();
  }

  onChangeImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => this.props.changeImage(reader.result);
  }

  onChangeDescription(event) {
    this.props.changeDescription(event.target.value);
  }

  onChangeName(event) {
    this.props.changeName(event.target.value);
  }

  onChangeCategory(event) {
    this.props.changeCategory(event.target.value);
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

  renderQuestions(questions) {
    let list = [];

    questions.map( (question, index) => {
      let text = <FormControl disabled type='text' key={ index } value={ question.props.obj.text } placeholder={ 'Question #' + (index + 1) } />;

      list.push(
        <Col sm={ 3 } md={ 2 }>
          <a href='#' onClick={ () => this.onEditQuestion(index) } style={{ textDecoration: 'none' }} >
            <Thumbnail>
              <FormGroup>
                <InputGroup>
                  {text}
                </InputGroup>
              </FormGroup>
            </Thumbnail>
          </a>
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

  scrollToBottom() {
    Scroll.animateScroll.scrollToBottom();
  }

  render() {
    let currentItem = this.state.editIndex;
    let title = 'Question #' + (currentItem + 1);
    let questions = this.props.questions.map( (question, index) =>
      <Question key={ index } id={ index } obj={ question } edit={ () => this.onEditQuestion } />
    );
    let displayQuestions = this.renderQuestions(questions);

    return (
      <div className='createGame'>
        <div className='bigContainer'>
          <div id='title'>
            <h1>Make up your own game</h1>
          </div>

          <PanelGroup defaultActiveKey='1' accordion>
            <Panel header='GENERAL INFO' eventKey='1'>
                <Form horizontal>

                  <FormGroup controlId='formName'>
                    <Col sm={ 1 }>
                      <ControlLabel>Name</ControlLabel>
                    </Col>
                    <Col sm={ 8 }>
                      <FormControl type='text' placeholder='90s music' onChange={ this.onChangeName } />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId='formControlsTextarea'>
                    <Col sm={ 1 }>
                      <ControlLabel>Description</ControlLabel>
                    </Col>
                    <Col sm={ 8 }>
                      <FormControl componentClass='textarea' type='text' onChange={ this.onChangeDescription } placeholder="A game about grunge, jazz and rock n' roll"/>
                    </Col>
                  </FormGroup>

                  <FormGroup controlId='imageasd'>
                    <Col sm={ 1 }>
                      <ControlLabel>Image</ControlLabel>
                    </Col>
                    <Col sm={ 8 }>
                      <FormControl type='file' onChange={ this.onChangeImage }/>
                    </Col>
                  </FormGroup>

                  <FormGroup controlId='formCategory'>
                    <Col sm={ 1 }>
                      <ControlLabel>Category</ControlLabel>
                    </Col>
                    <Col sm={ 8 }>
                      <FormControl componentClass='select' placeholder='select' onChange={ this.onChangeCategory }>
                        <option value='music'>Music</option>
                        <option value='sports'>Sports</option>
                        <option value='videogames'>Videogames</option>
                        <option value='history'>History</option>
                        <option value='other'>Other</option>
                      </FormControl>
                    </Col>
                  </FormGroup>

                </Form>
            </Panel>

            <Panel header='QUESTIONS' eventKey='2' onClick={ this.scrollToBottom } >
              <Grid>
                <Row className='show-grid'>
                  { displayQuestions }
                </Row>
              </Grid>
              <div>
                <Button bsStyle='primary' onClick={ this.onAddQuestion }>
                  <Glyphicon glyph='plus'/> NEW QUESTION
                </Button>
              </div> <br/>

              <Panel collapsible expanded={ this.state.showPanel }  eventKey='1'>
                <div>
                  <strong> { title } </strong>
                </div>
                <hr/>
                <Questions>
                  { questions[currentItem] }
                </Questions>
                <hr/>
                <div>
                  <Button bsStyle='default pull-right' onClick={ () => this.onRemoveQuestion(currentItem) }> Delete </Button> 
                  <Button bsStyle='default pull-right' onClick={ this.closePanel }> Save </Button> 
                </div>
              </Panel>
            </Panel>
          </PanelGroup>

          <div className='error-message'>{ this.props.error }</div>
          <Button bsSize='large' bsStyle='success pull-right' onClick={ this.onDone }> CREATE GAME! </Button>

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateGame));
