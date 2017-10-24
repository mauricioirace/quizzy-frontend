import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar } from 'react-bootstrap';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    <div className='navbar-action'>
      <a className='page-scroll' href='#matches'>Quizzy</a>
      <a className='page-scroll' href='#about'>CopyRight 2017</a>
    </div>
    
    
    return (
      <Navbar fixedBottom role='navigation'>
        <div className='container'>
          
          <div className='navbar-header'>
            
          </div>
        </div>
      </Navbar>
    )
  }
}

export default withRouter(Footer);
