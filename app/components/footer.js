import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';
import '../stylesheets/footer.scss';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className='display-flex'>
        <Grid>
          <Row>
            <Col>
              <img className='image' src={ require('../../assets/images/quizzy_logo.svg') }/>
            </Col>
            <Col xs={6} md={4}>
              <h1>
                COPYRIGHT 2017            
              </h1>
             </Col> 
          </Row>
        </Grid>
      </div>

      /*<Navbar>
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
      </Navbar>*/  
    )
  }
}

export default withRouter(Footer);
