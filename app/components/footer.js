import React from 'react';
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';
import '../stylesheets/footer.scss';

class Footer extends React.PureComponent {
  render() {
    return (
      <div className='display-flex'>
        <Grid>
          <Row>
            <img className='image' src={ require('../../assets/images/quizzy_logo.svg') }/>
            Copyright 2017 Quizzy, All Rights Reserved.
          </Row>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Footer);
