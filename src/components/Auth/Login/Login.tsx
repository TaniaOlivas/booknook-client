import * as React from 'react';
import { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
} from 'reactstrap';
import APIURL from '../../../helpers/environment';

interface LoginProps {
  updateLocalStorage: (newToken: string) => void;
  userLocalStorage: (newUser: string) => void;
  idLocalStorage: Function;
}

interface LoginState {
  email: string;
  password: string;
}

class Signup extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.updateLocalStorage(data.token);
        this.props.userLocalStorage(data.user.userType);
        this.props.idLocalStorage(data.user.id);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
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
      <Container style={{ alignItems: 'center' }}>
        <Row>
          <h1 style={{ textAlign: 'center', fontSize: '45px' }}>BookNook</h1>
        </Row>
        <Row className="mt-4 ps-3 pe-3">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                style={{ backgroundColor: 'white', color: '#181d31' }}
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                style={{ backgroundColor: 'white', color: '#181d31' }}
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormGroup>

            <div className="row ps-3 pe-3 pb-3">
              <Button
                style={{ backgroundColor: '#181D31', color: '#f5f1e5' }}
                className="col"
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                Login
              </Button>
            </div>
          </Form>
          <p style={{ textAlign: 'center' }}>Not a User?</p>
        </Row>
      </Container>
    );
  }
}

export default Signup;
