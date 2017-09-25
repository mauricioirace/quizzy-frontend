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
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
      </div>
      </div>
      <nav className='navbar navbar-custom navbar-fixed-top' role='navigation'>
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

    </nav>
    )
  }
}

export default withRouter(Header);
