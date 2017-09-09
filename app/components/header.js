import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends React.PureComponent {
  render() {
    return (
      <div>
          <Link to='/'>QUIZZY</Link>
          <Link to='/about'>About</Link>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
      </div>
    )
  }
}

export default withRouter(Header);
