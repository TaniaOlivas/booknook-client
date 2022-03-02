import * as React from 'react';
import { Component } from 'react';

interface LoginProps {}

interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  // constructor(props: LoginProps) {
  //     super(props);
  //     this.state = { :  };
  // }
  render() {
    return (
      <div>
        <h1>Hello from Login</h1>
      </div>
    );
  }
}

export default Login;
