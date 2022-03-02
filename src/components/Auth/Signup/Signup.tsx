import * as React from 'react';
import { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface SignupProps {
  updateLocalStorage: (newToken: string) => void;
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
    fetch('http://localhost:4000/user/register', {
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
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  render() {
    return (
      <div>
        <div className="container" style={{ width: '30%' }}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="firstName">First Name:</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                type="text"
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name:</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                type="text"
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
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
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormGroup>
            <FormGroup tag="fieldset">
              <Label>Type of User:</Label>
              <div style={{ textAlign: 'center' }}>
                <FormGroup check className="form-check-inline">
                  <Input
                    name="author"
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
                    name="user"
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
            <div className="row ps-3 pe-3">
              <Button className="col">Sign Up</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Signup;
