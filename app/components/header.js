import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import scrollToElement from 'scroll-to-element';
import '../stylesheets/header.scss';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      darkenHeader: false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    this.setState({
      darkenHeader: window.pageYOffset > 20 ? true : false
    });
  }

  animateScroll(id) {
    scrollToElement(`#${ id }`, {
      offset: 0,
      ease: 'inOutExpo',
      duration: 1500
    });
  }

  render() {
    let currentLocation = this.props.location.pathname;
    var homeButton;
    if (currentLocation == '/') {
      var navbarAction = (
        <div className='navbar-action'>
          <a onClick={ () => this.animateScroll('matches') } href='#matches'>Games</a>
          <a onClick={ () => this.animateScroll('about') } href='#about'>About</a>
        </div>
      );
      homeButton = (
        <a className='navbar-brand page-scroll' onClick={ () => this.animateScroll('page-top') } href='#page-top'>
          <Link className='logo-img' to='/'><img src={ require('../../assets/images/quizzy_logo.svg') }/></Link>
        </a>
      );
    } else {
      homeButton = (
        <a className='navbar-brand page-scroll'>
          <Link className='logo-img' to='/'><img src={ require('../../assets/images/quizzy_logo.svg') }/></Link>
        </a>
      );
    }
    var navbarClass = classNames({
      'navbar': true,
      'navbar-default': true,
      'navbar-fixed-top': true,
      'top-nav-collapse': this.state.darkenHeader
    });
    return (
      <Navbar fixedTop className={ navbarClass } ref={ el => this.navbar = el } role='navigation'>
        <div className='container'>
          { navbarAction }
          <div className='navbar-header'>
            { homeButton }
          </div>
        </div>
      </Navbar>
    )
  }
}

export default withRouter(Header);
