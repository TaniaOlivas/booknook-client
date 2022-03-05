import * as React from 'react';
import { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface CreateCommentProps {
  token: string;
}

interface CreateCommentState {
  content: string;
  bookReviewId: string | number;
}

class CreateComment extends Component<CreateCommentProps, CreateCommentState> {
  constructor(props: CreateCommentProps) {
    super(props);
    this.state = {
      content: '',
      bookReviewId: '',
    };
  }
  handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:4000/comment/comment', {
      method: 'POST',
      body: JSON.stringify({
        content: this.state.content,
        bookReviewId: this.state.bookReviewId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        this.setState({
          content: '',
          bookReviewId: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };
  render() {
    return <div></div>;
  }
}

export default CreateComment;
