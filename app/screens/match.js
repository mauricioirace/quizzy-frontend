import React from 'react';
import Header from '../common/components/header';

class Match extends React.PureComponent {

  render() {
    return (
      <div>
        <Header/>
        { this.props.params } screen
      </div>
    )
  }
}

export default Match;
