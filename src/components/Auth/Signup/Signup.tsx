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

interface SignupProps {
  updateLocalStorage: (newToken: string) => void;
  userLocalStorage: (newUser: string) => void;
  idLocalStorage: Function;
}

interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: '',
    };
  }

  handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${APIURL}/user/register`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        userType: this.state.userType,
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
      <Container>
        <Row>
          <h1 style={{ textAlign: 'center', fontSize: '45px' }}>BookNook</h1>
        </Row>
        <Row className="mt-4 ps-3 pe-3">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup className="row">
              <div className="col-6">
                <Label for="firstName">First Name:</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  style={{ backgroundColor: 'white', color: '#181d31' }}
                  value={this.state.firstName}
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                />
              </div>
              <div className="col-6">
                <Label for="lastName">Last Name:</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  style={{ backgroundColor: 'white', color: '#181d31' }}
                  value={this.state.lastName}
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                />
              </div>
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
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
                minLength={5}
                style={{ backgroundColor: 'white', color: '#181d31' }}
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormGroup>
            <FormGroup tag="fieldset">
              <Label>Type of User:</Label>
              <div style={{ textAlign: 'center' }}>
                <FormGroup check className="form-check-inline">
                  <Input
                    name="userType"
                    type="radio"
                    value="Author"
                    onChange={(e) =>
                      this.setState({ userType: e.target.value })
                    }
                  />
                  <Label check>Author</Label>
                </FormGroup>
                <FormGroup check className="form-check-inline">
                  <Input
                    name="userType"
                    type="radio"
                    value="User"
                    onChange={(e) =>
                      this.setState({ userType: e.target.value })
                    }
                  />
                  <Label check>User</Label>
                </FormGroup>
              </div>
            </FormGroup>
            <div className="row ps-3 pe-3 pb-3">
              <Button
                style={{ backgroundColor: '#181D31', color: '#f5f1e5' }}
                className="col"
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                Sign Up
              </Button>
            </div>
          </Form>
          <p style={{ textAlign: 'center' }}>Already a User?</p>
        </Row>
      </Container>
    );
  }
}

export default Signup;
