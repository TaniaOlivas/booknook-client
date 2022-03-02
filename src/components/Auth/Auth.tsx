import * as React from 'react';
import { Component } from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';

interface AuthProps {}

interface AuthState {}

class Auth extends React.Component<AuthProps, AuthState> {
  // constructor(props: AuthProps) {
  //     super(props);
  //     this.state = { :  };
  // }
  render() {
    return (
      <div>
        <Login />
        <Signup />
      </div>
    );
  }
}

export default Auth;
