import React from 'react';
import { Link, Route } from 'react-router-dom';

class Header extends React.PureComponent {
  render() {
    return (
      <div>
        <Link to='/'>QUIZZY</Link>
        <Route exact path='/' render={ () => (
          <Link to='/about'>About</Link>) }/>
        <Route exact path='/' render={ () => (
          <Link to='/register'>Register</Link>) }/>
        <Route exact path='/' render={ () => (
          <Link to='/login'>Login</Link>) }/>
      </div>
    )
  }
}

export default Header;
