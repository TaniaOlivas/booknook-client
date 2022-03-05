import * as React from 'react';
import { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface CreateReviewProps {
  token: string;
}

interface CreateReviewState {
  title: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  content: string;
  rating: string;
}

class CreateReview extends Component<CreateReviewProps, CreateReviewState> {
  constructor(props: CreateReviewProps) {
    super(props);
    this.state = {
      title: '',
      genre: '',
      pageLength: 0,
      picture: '',
      content: '',
      rating: '',
    };
  }
  handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:4000/review/create', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        genre: this.state.genre,
        pageLength: this.state.pageLength,
        picture: this.state.picture,
        rating: this.state.rating,
        content: this.state.content,
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
          title: '',
          genre: '',
          pageLength: 0,
          picture: '',
          rating: '',
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
        <h2 style={{ textAlign: 'center' }}>Create Review</h2>
        <div className="container" style={{ width: '60%' }}>
          <Form className="row g-3" onSubmit={this.handleSubmit}>
            <FormGroup className="col-md-5">
              <Label for="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="col-md-5">
              <Label for="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                placeholder="Genre"
                type="text"
                value={this.state.genre}
                onChange={(e) => this.setState({ genre: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="col-md-2">
              <Label for="pageLength">Pages</Label>
              <Input
                id="pageLength"
                name="pageLength"
                type="text"
                value={this.state.pageLength}
                onChange={(e) => this.setState({ pageLength: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="col-md-6 mt-0">
              <Label for="rating">Rating</Label>
              <Input
                id="rating"
                name="rating"
                placeholder="Rating"
                type="text"
                value={this.state.rating}
                onChange={(e) => this.setState({ rating: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="col-md-6 mt-0">
              <Label for="image">File</Label>
              <Input
                id="image"
                name="image"
                type="file"
                value={this.state.picture}
                onChange={(e) => this.setState({ picture: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="mt-0">
              <Label for="content">Text Area</Label>
              <Input
                id="content"
                name="content"
                type="textarea"
                placeholder="Post"
                value={this.state.content}
                onChange={(e) => this.setState({ content: e.target.value })}
              />
            </FormGroup>
            <div
              className="container"
              style={{ width: '60%', textAlign: 'right' }}
            >
              <Button>Submit</Button>
            </div>
          </Form>
        </div>{' '}
      </div>
    );
  }
}

export default CreateReview;
