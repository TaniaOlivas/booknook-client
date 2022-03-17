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
  Col,
} from 'reactstrap';

interface CreateReviewProps {
  token: string;
  fetchReviews: Function;
}

interface CreateReviewState {
  title: string;
  author: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  content: string;
  rating: number | string;
  image: string;
  loading: boolean;
  hover: number | string;
}

class CreateReview extends Component<CreateReviewProps, CreateReviewState> {
  constructor(props: CreateReviewProps) {
    super(props);
    this.state = {
      title: '',
      author: '',
      genre: '',
      pageLength: '',
      picture: '',
      content: '',
      rating: 0,
      image: '',
      loading: false,
      hover: 0,
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
        author: this.state.author,
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
        this.setState({
          title: '',
          author: '',
          genre: '',
          pageLength: '',
          picture: '',
          rating: 0,
          content: '',
          image: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  enterBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.background = 'white';
    e.currentTarget.style.color = '#181d31';
  };
  leaveBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    e.currentTarget.style.background = '#181d31';
    e.currentTarget.style.color = 'white';
  };

  render() {
    return (
      <Container
        className="rounded pt-2"
        style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
        }}
      >
        <Form
          onSubmit={this.handleSubmit}
          style={{
            backgroundColor: 'white',
          }}
        >
          <Row>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                style={{ borderColor: '#181d31' }}
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </FormGroup>
          </Row>
          <Row xs="2">
            <Col xs="8">
              <FormGroup>
                <Label for="author">Author</Label>
                <Input
                  style={{ borderColor: '#181d31' }}
                  id="author"
                  name="author"
                  placeholder="Author"
                  type="text"
                  value={this.state.author}
                  onChange={(e) => this.setState({ author: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="pageLength">Pages</Label>
                <Input
                  style={{ borderColor: '#181d31' }}
                  id="pageLength"
                  name="pageLength"
                  type="text"
                  placeholder="Pages"
                  value={this.state.pageLength}
                  onChange={(e) =>
                    this.setState({ pageLength: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="genre">Genre</Label>
                <Input
                  id="genre"
                  name="genre"
                  style={{ borderColor: '#181d31' }}
                  placeholder="Genre"
                  type="text"
                  value={this.state.genre}
                  onChange={(e) => this.setState({ genre: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <div className="star-rating">
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className={index <= this.state.rating ? 'on' : 'off'}
                        onClick={() => this.setState({ rating: index })}
                        onMouseEnter={() => this.setState({ hover: index })}
                        onMouseLeave={() =>
                          this.setState({ hover: this.state.rating })
                        }
                      >
                        <span className="star">&#9733;</span>
                      </button>
                    );
                  })}
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <FormGroup>
              <Label for="content">Review</Label>
              <Input
                id="content"
                name="content"
                style={{ borderColor: '#181d31' }}
                type="textarea"
                placeholder="Review"
                value={this.state.content}
                onChange={(e) => this.setState({ content: e.target.value })}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Label for="content">Picture</Label>
              <Input
                type="file"
                name="file"
                style={{ borderColor: '#181d31' }}
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
          </Row>
          <Row>
            <FormGroup>
              <Button
                style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                Submit
              </Button>
            </FormGroup>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default CreateReview;
