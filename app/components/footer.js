import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar } from 'react-bootstrap';
import '../stylesheets/footer.scss';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      /*<div className='display-flex'>
        <img className='logo-img' src={ require('../../assets/images/quizzy_logo.svg') }/>
        <h1>
          COPYRIGHT 2017            
        </h1>
      </div>*/

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a className='logo-img' >
              <img src={ require('../../assets/images/quizzy_logo.svg') }/>
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Text pullRight>
          CopyRight 2017
        </Navbar.Text>
      </Navbar>  
    )
  }
}

export default withRouter(Footer);
