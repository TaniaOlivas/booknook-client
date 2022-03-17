import * as React from 'react';
import { Component } from 'react';
import APIURL from '../../../../helpers/environment';
import { Form, FormGroup, Input, Button, Row } from 'reactstrap';

interface CreateCommentProps {
  token: string;
  review: number;
  refreshComments: boolean;
  fetchComments: Function;
}

interface CreateCommentState {
  content: string;
}

class CreateComment extends Component<CreateCommentProps, CreateCommentState> {
  constructor(props: CreateCommentProps) {
    super(props);
    this.state = {
      content: '',
    };
  }
  handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`${APIURL}/comment/comment`, {
      method: 'POST',
      body: JSON.stringify({
        content: this.state.content,
        bookReviewId: this.props.review,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.fetchComments();
        this.setState({
          content: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  enterBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.background = '#eeebe2';
    e.currentTarget.style.color = '#181d31';
  };
  leaveBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.background = '#181d31';
    e.currentTarget.style.color = '#eeebe2';
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <FormGroup>
              <Input
                id="comment"
                name="comment"
                style={{
                  fontSize: '12px',
                  color: '#181d31',
                }}
                placeholder="Leave a comment"
                type="text"
                value={this.state.content}
                onChange={(e) => this.setState({ content: e.target.value })}
              />
            </FormGroup>
          </Row>
          <Row className="mx-0">
            <Button
              style={{
                backgroundColor: '#181d31',
                color: '#eeebe2',
                fontSize: '12px',
              }}
              onMouseEnter={this.enterBtn}
              onMouseLeave={this.leaveBtn}
            >
              Comment
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

export default CreateComment;
