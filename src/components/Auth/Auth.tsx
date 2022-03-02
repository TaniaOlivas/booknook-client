import * as React from 'react';
import { Component } from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';

interface AuthProps {
  updateLocalStorage: (newToken: string) => void;
}

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
        <Signup updateLocalStorage={this.props.updateLocalStorage} />
      </div>
    );
  }
}

export default Auth;
