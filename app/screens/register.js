import React from 'react';
import Header from '../components/header';

class Register extends React.PureComponent {
  render() {
    return (
      <div>
        Email: <input type='text' name='username' placeholder='Email'/><br/>
        User name: <input type='text' name='username' placeholder='Username'/><br/>
        Password: <input type='text' name='password' placeholder='Password'/><br/>
        <input type='submit' name='submit' value='Confirm'/>
      </div>
    )
  }
}

export default Register;
