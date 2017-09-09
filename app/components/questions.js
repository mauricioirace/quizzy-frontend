import React, { PropTypes} from 'react';
import Question from './question';

class Questions extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  // renderQuestions(){
    // return this.props.children.map((q) => <Question obj={ q } />)
  // }

  render() {
    return (
      <ul>
        { this.props.children() }
      </ul>
    );
  }
}

export default Questions;