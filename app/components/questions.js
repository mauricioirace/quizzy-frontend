import React, { PropTypes } from 'react';
import Question from './question';

class Questions extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className='questions-container'>
        { this.props.children }
      </div>
    );
  }
}

export default Questions;
