import React from 'react';
import Header from '../components/header';

class Register extends React.PureComponent {
  render() {
    return (
      <div className='centered-container'>
        <div className='form-container'>
          <div className='form-input vertical long'>
            <div className='row'>
              <label className='fs-16'>Email: </label><input className='fs-16' type='text' name='username' placeholder='Email'/>
            </div>
            <div className='row'>
              <label className='fs-16'>Username: </label><input className='fs-16' type='text' name='username' placeholder='Username'/>
            </div>
            <div className='row'>
              <label className='fs-16'>Password: </label><input className='fs-16' type='text' name='password' placeholder='Password'/>
            </div>
            <div className='row'>
              <input className='button primary long' type='submit' name='submit' value='Confirm'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
