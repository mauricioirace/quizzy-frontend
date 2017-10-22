import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar } from 'react-bootstrap';
import '../stylesheets/header.scss';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
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
    if ($('.navbar').offset().top > 20) {
      $('.navbar-fixed-top').addClass('top-nav-collapse');
    } else {
      $('.navbar-fixed-top').removeClass('top-nav-collapse');
    }
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
    return (
      <Navbar fixedTop role='navigation'>
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
