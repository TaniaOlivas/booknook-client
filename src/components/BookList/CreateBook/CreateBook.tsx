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

interface CreateBookProps {
  token: string;
  fetchBooks: Function;
}

interface CreateBookState {
  title: string;
  author: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  image: string;
  loading: boolean;
  hover: number | string;
}

class CreateBook extends Component<CreateBookProps, CreateBookState> {
  constructor(props: CreateBookProps) {
    super(props);
    this.state = {
      title: '',
      author: '',
      genre: '',
      pageLength: '',
      picture: '',
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
        author: this.state.author,
        genre: this.state.genre,
        pageLength: this.state.pageLength,
        picture: this.state.picture,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.fetchBooks();
        console.log(data);

        this.setState({
          title: '',
          author: '',
          genre: '',
          pageLength: '',
          picture: '',
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
        className="rounded"
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
          <Row xs="2">
            <Col xs="8">
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
                <Label for="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  style={{ borderColor: '#181d31' }}
                  placeholder="Author"
                  type="text"
                  value={this.state.author}
                  onChange={(e) => this.setState({ author: e.target.value })}
                />
              </FormGroup>
            </Col>
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
                <img
                  src={this.state.image}
                  style={{ width: '200px' }}
                  alt="Book Cover"
                />
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

export default CreateBook;
