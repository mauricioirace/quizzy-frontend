import React from 'react';
import createGameStyle from '../assets/styles/create-game.scss';
import { addQuestion,changeQuestionName} from '../redux/actions/game';
import Questions from '../components/questions';
import Question from '../components/question';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    questions: state.questions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question) => dispatch(addQuestion(question)),
    changeQuestionName: (newQuestion,index) => dispatch(changeQuestionName(newQuestion,index))
  };
};

const question = (i) => {
  return {
    text: `Question ${i}`,
    answers: [1,2,3,4].map((j) =>`Answer ${j}`),
    correctAnswer: 1
  };
};

class CreateGame extends React.PureComponent {

  componentWillMount() {
    this.props.addQuestion(question(1));
  }

  componentWillUnmount() {
    // remove all questions
  }

  render() {
    let questions = this.props.questions.map((q) => <Question obj={ q } />);

    return (
      <div>
        <div>
          <h2> MAKE UP YOUR OWN GAME </h2>
        </div>

            Name <input type='text' name='name' placeholder='eg: Tennis Champions'/>
        Image <button>Load</button><br/>
        Category <select>
                   <option value="sport">Sport</option>
                   <option value="tv">Television</option>
                   <option value="videogames">Videogames</option>
                 </select>
                 <br/>
        Questions <br/>
        <Questions>
          { questions }
        </Questions>
        <button onClick={ addQuestion(this.props.questions.length) }>Add...</button> <br/>
        <button>Done</button>  <button>Cancel</button> <br/>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateGame);
