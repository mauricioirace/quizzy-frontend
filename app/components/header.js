import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar } from 'react-bootstrap';
import '../stylesheets/header.scss';

class Header extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('load', this.animateScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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
    return (
      <Navbar fixedTop role='navigation'>
        <div className='container'>
          <div className='navbar-action'>
            <a className='page-scroll' href='#matches'>Games</a>
            <a className='page-scroll' href='#about'>About</a>
          </div>
          <div className='navbar-header'>
            <a className='navbar-brand page-scroll' href='#page-top'>
              <Link className='logo-img' to='/'><img src={ require('../../assets/images/quizzy_logo.svg') }/></Link>
            </a>
          </div>
        </div>
      </Navbar>
    )
  }
}

export default withRouter(Header);
