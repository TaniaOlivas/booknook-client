import * as React from 'react';
import { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface CreateReviewProps {
  token: string;
  fetchReviews: Function;
}

interface CreateReviewState {
  title: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  content: string;
  rating: string;
  image: string;
  loading: boolean;
}

class CreateReview extends Component<CreateReviewProps, CreateReviewState> {
  constructor(props: CreateReviewProps) {
    super(props);
    this.state = {
      title: '',
      genre: '',
      pageLength: '',
      picture: '',
      content: '',
      rating: '',
      image: '',
      loading: false,
    };
  }
  uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const files: File = (target.files as FileList)[0];
    const data = new FormData();
    data.append('file', files);
    data.append('upload_preset', 'BookNook');
    this.setState({ loading: true });
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/tolivas/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const File = await res.json();
    console.log(File.secure_url);
    this.setState({ image: File.secure_url });
    this.setState({ picture: File.secure_url });
    this.setState({ loading: false });
  };
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
        this.props.fetchReviews();
        console.log(data);

        this.setState({
          title: '',
          genre: '',
          pageLength: '',
          picture: '',
          rating: '',
          content: '',
          image: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  render() {
    return (
      <div>
        <div
          className="container"
          style={{
            borderRadius: '1%',
            backgroundColor: 'white',
          }}
        >
          <h3 style={{ textAlign: 'center' }}>Create Review</h3>
          <Form className="row g-3" onSubmit={this.handleSubmit}>
            <FormGroup className="col-md-6">
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
            <FormGroup className="col-md-6">
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
            <FormGroup className="col-md-6 mt-0">
              <Label for="pageLength">Pages</Label>
              <Input
                id="pageLength"
                name="pageLength"
                type="text"
                placeholder="Pages"
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
            <FormGroup className="mt-0">
              <Label for="content">Review</Label>
              <Input
                id="content"
                name="content"
                type="textarea"
                placeholder="Review"
                value={this.state.content}
                onChange={(e) => this.setState({ content: e.target.value })}
              />
            </FormGroup>
            <FormGroup className="mt-0">
              <Label for="content">Picture</Label>
              <Input
                type="file"
                name="file"
                placeholder="Choose Image"
                onChange={this.uploadImage}
                value=""
              />{' '}
              <br />
              {this.state.loading ? (
                <h5>Loading...</h5>
              ) : (
                <img src={this.state.image} style={{ width: '200px' }} />
              )}
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
