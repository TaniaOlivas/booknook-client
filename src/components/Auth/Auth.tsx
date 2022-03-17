import * as React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';
import Login from './Login/Login';
import Signup from './Signup/Signup';

interface AuthProps {
  updateLocalStorage: (newToken: string) => void;
  userLocalStorage: (newUser: string) => void;
  idLocalStorage: Function;
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
  enterBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.background = '#f5f1e5';
    e.currentTarget.style.color = '#181d31';
  };
  leaveBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.background = '#181d31';
    e.currentTarget.style.color = '#f5f1e5';
  };
  render() {
    return (
      <div style={{ marginTop: '5%' }}>
        <div>
          {this.state.isLoginVisible === true ? (
            <Login
              updateLocalStorage={this.props.updateLocalStorage}
              userLocalStorage={this.props.userLocalStorage}
              idLocalStorage={this.props.idLocalStorage}
            />
          ) : (
            <Signup
              updateLocalStorage={this.props.updateLocalStorage}
              userLocalStorage={this.props.userLocalStorage}
              idLocalStorage={this.props.idLocalStorage}
            />
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          {this.state.isLoginVisible === true ? (
            <Button
              style={{ backgroundColor: '#181D31', color: '#f5f1e5' }}
              onClick={this.handleToggle}
              onMouseEnter={this.enterBtn}
              onMouseLeave={this.leaveBtn}
            >
              Click Here to Sign Up
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: '#181D31', color: '#f5f1e5' }}
              onClick={this.handleToggle}
              onMouseEnter={this.enterBtn}
              onMouseLeave={this.leaveBtn}
            >
              Click Here to Login
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Auth;
