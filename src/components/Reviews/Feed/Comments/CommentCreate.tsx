import * as React from 'react';
import { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

interface CreateCommentProps {
  token: string;
  review: number;
  refreshComments: boolean;
  fetchComments: Function;
}

interface review {
  id: number;
  title: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  content: string;
  rating: string;
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
    fetch('http://localhost:4000/comment/comment', {
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
        console.log(data);
        this.setState({
          content: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  render() {
    return (
      <div>
        {' '}
        <div className="container" style={{ width: '60%' }}>
          <Form className="row g-3" onSubmit={this.handleSubmit}>
            <FormGroup className="col-md-10">
              <Input
                id="comment"
                name="comment"
                placeholder="Comment"
                type="text"
                value={this.state.content}
                onChange={(e) => this.setState({ content: e.target.value })}
              />
            </FormGroup>
            <div className="col-md-2 mt-3 ps-3">
              <Button>Comment</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateComment;
