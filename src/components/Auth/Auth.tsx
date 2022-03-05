import * as React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';
import Login from './Login/Login';
import Signup from './Signup/Signup';

interface AuthProps {
  updateLocalStorage: (newToken: string) => void;
  userLocalStorage: (newUser: string) => void;
}

interface AuthState {
  isLoginVisible: boolean;
}

class Auth extends Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = { isLoginVisible: true };
  }

  handleToggle = () => {
    if (this.state.isLoginVisible === true) {
      this.setState({ isLoginVisible: false });
    } else {
      this.setState({ isLoginVisible: true });
    }
  };

  render() {
    return (
      <div>
        <div>
          {this.state.isLoginVisible === true ? (
            <Login
              updateLocalStorage={this.props.updateLocalStorage}
              userLocalStorage={this.props.userLocalStorage}
            />
          ) : (
            <Signup
              updateLocalStorage={this.props.updateLocalStorage}
              userLocalStorage={this.props.userLocalStorage}
            />
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          {this.state.isLoginVisible === true ? (
            <Button onClick={this.handleToggle}>Click Here to Sign Up</Button>
          ) : (
            <Button onClick={this.handleToggle}>Click Here to Login</Button>
          )}
        </div>
      </div>
    );
  }
}

export default Auth;
