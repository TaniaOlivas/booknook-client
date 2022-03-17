import { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from 'reactstrap';
import { book } from '../BooksIndex';

interface ReviewBookProps {
  bookToUpdate: book;
  updateOff: Function;
  token: string;
  fetchBooks: Function;
}

interface ReviewBookState {
  title: string;
  author: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  content: string;
  rating: number | string;
  modal: boolean;
  hover: number | string;
}

class ReviewBook extends Component<ReviewBookProps, ReviewBookState> {
  constructor(props: ReviewBookProps) {
    super(props);
    this.state = {
      title: this.props.bookToUpdate.title,
      author: this.props.bookToUpdate.author,
      genre: this.props.bookToUpdate.genre,
      pageLength: this.props.bookToUpdate.pageLength,
      picture: this.props.bookToUpdate.picture,
      content: '',
      rating: 0,
      modal: false,
      hover: 0,
    };
  }

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
      .then((res) => {
        res.json();
        // this.props.updateOff();
      })
      .then((data) => {
        this.setState({
          title: '',
          author: '',
          genre: '',
          pageLength: '',
          picture: '',
          rating: 0,
          content: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  toggle = () => {
    this.props.updateOff();
  };
  imageSet = (image: string) => {
    this.setState({ picture: image });
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
        <Modal isOpen={true} toggle={this.toggle}>
          <ModalHeader
            style={{
              backgroundColor: '#181d31',
              color: '#fffef7',
              borderBottomColor: '#181d31',
            }}
            toggle={this.toggle}
          >
            Create Review
          </ModalHeader>
          <ModalBody style={{ backgroundColor: '#fffef7', color: '#181d31' }}>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <FormGroup>
                  <Label for="Title">Title</Label>
                  <Input
                    style={{ borderColor: '#181d31' }}
                    id="Title"
                    type="text"
                    name="Title"
                    value={this.state.title}
                    placeholder="Title"
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
                      onChange={(e) =>
                        this.setState({ author: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    <Label for="pageLength">Pages</Label>
                    <Input
                      style={{ borderColor: '#181d31' }}
                      id="pageLength"
                      type="text"
                      name="pageLength"
                      value={this.state.pageLength}
                      placeholder="Pages"
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
                      style={{ borderColor: '#181d31' }}
                      type="text"
                      name="genre"
                      id="genre"
                      value={this.state.genre}
                      onChange={(e) => this.setState({ genre: e.target.value })}
                      placeholder="Genre"
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
                            className={
                              index <= this.state.rating ? 'on' : 'off'
                            }
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
                  <Button
                    style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                    type="submit"
                    onMouseEnter={this.enterBtn}
                    onMouseLeave={this.leaveBtn}
                  >
                    {' '}
                    Submit{' '}
                  </Button>
                </FormGroup>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ReviewBook;
