import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import '../stylesheets/header.scss';

class Header extends React.PureComponent {
  render() {
    return (
      <div className='header'>
        <Link className='logo-img' to='/'><img src={ require('../../assets/images/quizzy_logo.svg') }/></Link>
        <div className='action-container'>
          <Link to='/about'>About</Link>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
