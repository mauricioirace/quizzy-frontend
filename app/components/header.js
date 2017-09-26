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
    if ($('.navbar').offset().top > 50) {
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
            <div className='navbar-header'>
                <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-main-collapse'>
                    Menu <i className='fa fa-bars'></i>
                </button>
                <a className='navbar-brand page-scroll' href='#page-top'>
                  <Link className='logo-img' to='/'><img src={ require('../../assets/images/quizzy_logo.svg') }/></Link>
                </a>
            </div>


            <div className='collapse navbar-collapse navbar-right navbar-main-collapse'>
                <ul className='nav navbar-nav'>

                    <li className='hidden'>
                        <a href='#page-top'></a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#about'>About</a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#download'>Download</a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#contact'>Contact</a>
                    </li>
                </ul>
            </div>
        </div>

    </Navbar>
    )
  }
}

export default withRouter(Header);
