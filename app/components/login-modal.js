import React from 'react';
import { Button, Checkbox, Col, Form, FormControl, FormGroup, Modal, ControlLabel} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginModal extends React.PureComponent {

  render() {
    return (
      <Modal
        show={ this.props.show == 'signIn' }
        onHide={ this.props.setHide }
        container={ this }
        aria-labelledby='contained-modal-title' 
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title'>Sign in to save</Modal.Title>
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
                    Save and Continue
                  </Button>
                </Link>  
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Col xs={ 12 } lg={ 4 } sm={ 10 }>
            <p>Do not have an account?</p>
            <Button bsStyle='link' onClick={ () => this.props.setSignUp() }>
              Sign up
            </Button>
          </Col>
          <Button onClick={ () => this.props.setHide() }>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default LoginModal;