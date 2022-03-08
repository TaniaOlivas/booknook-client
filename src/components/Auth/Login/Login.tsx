import * as React from 'react';
import { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

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
    fetch('http://localhost:4000/user/login', {
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

  render() {
    return (
      <div>
        <div className="container" style={{ width: '30%' }}>
          <Form onSubmit={this.handleSubmit}>
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

            <div className="row ps-3 pe-3 pb-3">
              <Button className="col">Login</Button>
            </div>
          </Form>
          <p style={{ textAlign: 'center' }}>Not a User?</p>
        </div>
      </div>
    );
  }
}

export default Signup;
