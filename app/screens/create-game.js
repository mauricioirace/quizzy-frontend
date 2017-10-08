import React from 'react';
import {
  addQuestion,
  changeCategory,
  changeDescription,
  changeImage,
  changeName,
  createGame,
  removeAllData,
  removeQuestion
} from '../redux/actions/game';
import Questions from '../components/questions';
import Question from '../components/question';
import { connect } from 'react-redux';
import empty from '../../assets/images/empty.svg';
import { withRouter } from 'react-router-dom';
import '../stylesheets/create-game.scss';
import { Button, Col, Row, Form, FormGroup, ControlLabel, FormControl, PageHeader, Well, InputGroup,
  Glyphicon, Panel,  Thumbnail, Grid, Carousel, PanelGroup, ProgressBar } from 'react-bootstrap';

import GameGeneralInfo from '../components/game-general-info';

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
    removeAllData: () => dispatch(removeAllData()),
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
    answers: [{ 'answer': '' }, { 'answer': '' }],
    correctAnswer: 0
  };
};

class CreateGame extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { step: 1 };
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.stepTitle = this.stepTitle.bind(this);
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
    this.props.history.push('/start-match');
  }

  componentWillMount() {
    // remove all data Game
    this.props.removeAllData();
  }

  componentWillUnmount() {
    // remove all data Game
    this.props.removeAllData();
  }

  onAddQuestion() {
    let indexWhereAdd = this.props.questions.length;
    this.props.addQuestion(question(indexWhereAdd));
  }

  onChangeImage(file, reader) {
    reader.readAsDataURL(file);
    reader.onloadend = (e) => this.props.changeImage(reader.result);
  }

  onChangeDescription(value) {
    this.props.changeDescription(value);
  }

  onChangeName(value) {
    this.props.changeName(value);
  }

  onChangeCategory(value) {
    this.props.changeCategory(value);
  }

  onRemoveQuestion(index) {
    this.props.removeQuestion(index);
  }

  nextStep() {
    this.setState({ step: this.state.step + 1 });
    console.log("step", this.state.step)
  }

  prevStep() {
    this.setState({ step: this.state.step - 1 });
    console.log("step", this.state.step)
  }

  stepTitle() {
    switch (this.state.step) {
      case 1:
        return (
          <h3> GENERAL INFO </h3>
        )
      case 2:
        return (
          <h3> QUESTIONS </h3>
        )
      case 3:
      return (
        <h3> FINAL STEP </h3>
      )
    }
  }

  showStep() {
    switch (this.state.step) {
      case 1:
        return (
          <div>
            <GameGeneralInfo 
              changeName={ this.onChangeName }
              changeDescription={ this.onChangeDescription }
              changeImage={ this.onChangeImage }
              changeCategory={ this.onChangeCategory }
            />
            <Button bsSize='large' bsStyle='success pull-right' onClick={ this.nextStep }>Next</Button>
          </div>
        )
      case 2:
        return (
          <div>
            <Questions 
              questions={ this.props.questions }
              editQuestion={ this.onEditQuestion }
              addQuestion={ this.onAddQuestion }
              scroll={ this.scrollToBottom }
              removeQuestion={ this.onRemoveQuestion }
            />
            <Button bsSize='large' bsStyle='default pull-left' onClick={ this.prevStep }>Prev</Button>
            <Button bsSize='large' bsStyle='success pull-right' onClick={ this.nextStep }>Next</Button>
          </div>
        )
      case 3:
        return (
          <div>
            <h2> ACA VA ALGO DE MATCH </h2>
            <div className='error-message'>{ this.props.error }</div>     
            <Button bsSize='large' bsStyle='default pull-left' onClick={ this.prevStep.bind(this) }>Prev</Button>                   
            <Button bsSize='large' bsStyle='success pull-right' onClick={ this.onDone }> CREATE! </Button>
          </div>
        )
    }
  }

  render() {
    let progress = (this.state.step / 3 * 100)
    const title = this.stepTitle()

    return (
      <div className='createGame'>
        <div className='bigContainer'>
          <div id='title'>
            <h1>Create your own game</h1>
          </div>

          <span className="progress-step">{ title }</span>
          <ProgressBar bsStyle="success" now={ progress } />
          { this.showStep() }

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateGame));
