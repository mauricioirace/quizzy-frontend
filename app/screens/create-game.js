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
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel, Glyphicon } from 'react-bootstrap';

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
    difficulty: 'Easy',
    answers: [ '','','','' ],
    correctAnswer: 0
  };
};

class CreateGame extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { show: false };
    this.state = { editIndex: 0 };
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.openModal();
  }

  onRemoveQuestion(index) {
    this.props.removeQuestion(index);
    this.closeModal();
  }

  renderQuestions(questions) {
    let list = [];

    questions.map( (question, index) => {
      let questionText = question.props.obj.text;
      let text = <FormControl type='text' key={ index } value={ questionText } placeholder={ 'Question #' + (index + 1) } />;
      let deleteButton = <Button onClick={ () => this.onRemoveQuestion(index) }> <Glyphicon glyph="trash"/></Button>
      let editButton = <Button onClick={ () => this.onEditQuestion(index) }> <Glyphicon glyph="edit"/> </Button>

      list.push( <Form inline> { text } { deleteButton } { editButton } </Form> );
      list.push( <br/> );
    });
    return list;
  }

  openModal() {
    this.setState({ show:true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  nextQuestion(index) {
    const next = index + 1;
    if ((this.props.questions.length -1) < next) {
      this.onAddQuestion();
    }
    this.onEditQuestion(index + 1)
  }

  prevQuestion(index) {
    if (index != 0) {
      this.onEditQuestion(index - 1)
    }
  }

  render() {
    const currentItem = this.state.editIndex;
    let questions = this.props.questions.map( (question, index) =>
      <Question key={ index } id={ index } obj={ question } edit={ () => this.onEditQuestion } />
    );
    let displayQuestions = this.renderQuestions(questions);

    return (
      <div className='create-game'>
        <h2> MAKE UP YOUR OWN GAME </h2>
        <div className='flex-container'>
          <div className='centered-container'>
            <div className='form-container'>
              <div className='form-input vertical long'>
                <div className='row'>
                  <label>Name:</label>
                  <input
                    type='text' name='name' value={ this.props.name || '' }
                    onChange={ this.onChangeName } placeholder='eg: Tennis Champions'
                  />
                </div>
                <div className='row'>
                  <label>Description:</label>
                  <textarea value={ this.props.description } onChange={ this.onChangeDescription } placeholder="eg: You've just lost the game"/>
                </div>
                <div className='row'>
                  <label className='upload-image' htmlFor='uploadImage'>
                    <label> Choose an image:</label>
                    <input hidden type='file' id='uploadImage' name='image' onChange={ this.onChangeImage }/>
                    <img src={ this.props.image === null ? empty : this.props.image } height="100" id="previewImage"/>
                  </label>
                </div>
                <div className='row'>
                  <label>Category:</label>
                  <select onChange={ this.onChangeCategory }>
                    <option value='sports'>Sports</option>
                    <option value='tv'>Television</option>
                    <option value='videogames'>Videogames</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='centered-container'>
              <div className='form-input vertical long'>
                  <label>Questions:</label>
                    { displayQuestions }
                  <div className="error-message">{ this.props.error }</div>
                  <button className='button action small' onClick={ this.onAddQuestion }>Add...</button>
                  <button className='button primary small' onClick={ this.onDone }>Done</button>  <button className='cancel'>Cancel</button>
               </div>
            </div>

          <div className="modal-container">
            <Modal show={ this.state.show } onHide={ this.closeModal } container={ this } aria-labelledby="contained-modal-title">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Question #{ currentItem + 1 } </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Questions>
                    { questions[currentItem] }
                  </Questions>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle='default pull-left' onClick={ () => this.onRemoveQuestion(currentItem) } >
                   <Glyphicon glyph="trash"/>
                </Button>
                <Button bsStyle='default pull-left' onClick={ () => this.prevQuestion(currentItem) } >
                   <Glyphicon glyph='chevron-left'/>
                </Button>
                <Button bsStyle='default' onClick={ () => this.nextQuestion(currentItem) } >
                   <Glyphicon glyph='chevron-right'/>
                </Button>
                <Button bsStyle='default' onClick={ this.closeModal }>
                  <Glyphicon glyph='check'/>
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateGame));
