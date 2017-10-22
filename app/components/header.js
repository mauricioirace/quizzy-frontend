import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
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
    window.addEventListener('click', this.animateScroll);
    window.addEventListener('load', this.animateScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('click', this.animateScroll);
    window.removeEventListener('load', this.animateScroll);
  }

  handleScroll(event) {
    // console.log(ReactDOM.findDOMNode(this.navbar).offsetTop);
    this.setState({
        darkenHeader: window.pageYOffset > 20 ? true : false
    });
  }

  animateScroll() {
    $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  }

  render() {
    let currentLocation = this.props.location.pathname;
    var homeButton;
    if (currentLocation == '/') {
      var navbarAction = (
        <div className='navbar-action'>
          <a className='page-scroll' href='#matches'>Games</a>
          <a className='page-scroll' href='#about'>About</a>
        </div>
      );
      homeButton = (
        <a className='navbar-brand page-scroll' href='#page-top'>
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
