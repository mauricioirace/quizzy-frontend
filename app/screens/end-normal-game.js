import React from 'react';
import Header from '../components/header';
import { Button, ButtonToolbar, Jumbotron, ListGroup, ListGroupItem, Table, Modal, FormGroup, Col,
        FormControl, Checkbox, Form, ControlLabel } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import endNormalGameStyle from '../../assets/js/end-normal-game.js';
import { sortBy } from 'underscore';

class EndNormalGame extends React.PureComponent {
    
  constructor(props) {
    super(props);
    this.state = {
      showModal: 'hide'
    };
    this.setModalSignIn = this.setModalSignIn.bind(this);
    this.setModalSignUp = this.setModalSignUp.bind(this);
    this.setModalHide = this.setModalHide.bind(this);
  }

  setModalSignIn() {
    this.setState({ showModal: 'signIn' });    
  }

  setModalSignUp() {
    this.setState({ showModal: 'signUp' });
  }

  setModalHide() {
    this.setState({ showModal: 'hide' });    
  }

  render() {
    return (
      <div className='container'>
         <Jumbotron>
          <h1>Your final score is 100!</h1>
          <p>Would you like to save your score to compete with other players?</p>
          <p>
            <Button bsStyle='success' onClick={ () => this.setModalSignIn() }>
              Save
            </Button>
            <Link to={ '/' }>
              <Button bsStyle='default'>
                Return Home
              </Button>
            </Link>  
          </p>
        </Jumbotron>

        <div className='modal-container' style={{ height: 20 }}>
          <Modal
            show={ this.state.showModal == 'signIn' }
            onHide={ this.setModalHide }
            container={ this }
            aria-labelledby='contained-modal-title' 
          >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title'>Sign in to save your score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>
                <FormGroup controlId='formHorizontalEmail'>
                  <Col componentClass={ ControlLabel } sm={ 2 }>
                    Email
                  </Col>
                  <Col sm={ 10 }>
                    <FormControl type='email' placeholder='Email' />
                  </Col>
                </FormGroup>

                <FormGroup controlId='formHorizontalPassword'>
                  <Col componentClass={ ControlLabel } sm={ 2 }>
                    Password
                  </Col>
                  <Col sm={ 10 }>
                    <FormControl type='password' placeholder='Password' />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={ 2 } sm={ 10 }>
                    <Checkbox>
                      Remember me
                    </Checkbox>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={ 2 } sm={ 10 }>
                    <Link to={'/'}>
                      <Button bsStyle='primary' type='submit'>
                        Sign in
                      </Button>
                    </Link>  
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Col xs={ 12 } lg={ 4 } sm={ 10 }>
                <p>Do not have an account?</p>
                <Button bsStyle='link' onClick={ () => this.setModalSignUp() }>
                  Sign up
                </Button>
              </Col>
              <Button onClick={ () => this.setModalHide() }>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className='modal-container' style={{ height: 20 }}>
          <Modal
            show={ this.state.showModal == 'signUp' }
            onHide={ this.setModalHide }
            container={ this }
            aria-labelledby='contained-modal-title' 
          >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title'>Sign up to save your score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>
                <FormGroup controlId='formHorizontalUsername'>
                  <Col componentClass={ ControlLabel } sm={ 2 }>
                    Username
                  </Col>
                  <Col sm={ 10 }>
                    <FormControl type='text' placeholder='Username' />
                  </Col>
                </FormGroup>

                <FormGroup controlId='formHorizontalEmail'>
                  <Col componentClass={ ControlLabel } sm={ 2 }>
                    Email
                  </Col>
                  <Col sm={ 10 }>
                    <FormControl type='email' placeholder='Email' />
                  </Col>
                </FormGroup>

                <FormGroup controlId='formHorizontalPassword'>
                  <Col componentClass={ ControlLabel } sm={ 2 }>
                    Password
                  </Col>
                  <Col sm={ 10 }>
                    <FormControl type='password' placeholder='Password' />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={ 2 } sm={ 10 }>
                    <Link to={ '/' }>
                      <Button bsStyle='primary' type='submit'>
                        Confirm
                      </Button>
                    </Link>  
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={ () => this.setModalHide() }>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <h2>Leaderboard</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Place</th>
              <th>Player</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>13</td>
              <td>guille</td>
              <td>105</td>
            </tr>
            <tr>
              <td>14</td>
              <td>seba_bolso</td>
              <td>103</td>
            </tr>
            <tr style={ endNormalGameStyle.currentPlayer }>
              <td>15</td>
              <td>pepito (You)</td>
              <td>100</td>
            </tr>
            <tr>
              <td>16</td>
              <td>mauricap</td>
              <td>97</td>
            </tr>
            <tr>
              <td>17</td>
              <td>voiras</td>
              <td>95</td>
            </tr>
          </tbody>
        </Table>
        <p>
          Share your score!
        </p>
        <Button bsStyle='primary' bsSize='small'>f | Compartir</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    matchData: state.matchData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentMatch: (input) => dispatch(loadCurrentMatch(input)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EndNormalGame)
