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
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { book } from '../BooksIndex';

interface UpdateBookProps {
  bookToUpdate: book;
  updateOff: Function;
  token: string;
  fetchBooks: Function;
}

interface UpdateBookState {
  editId: number;
  editTitle: string;
  editAuthor: string;
  editGenre: string;
  editPageLength: number | string;
  editPicture: string;
  modal: boolean;
  hover: number | string;
}

class UpdateBook extends Component<UpdateBookProps, UpdateBookState> {
  constructor(props: UpdateBookProps) {
    super(props);
    this.state = {
      editId: this.props.bookToUpdate.id,
      editTitle: this.props.bookToUpdate.title,
      editAuthor: this.props.bookToUpdate.author,
      editGenre: this.props.bookToUpdate.genre,
      editPageLength: this.props.bookToUpdate.pageLength,
      editPicture: this.props.bookToUpdate.picture,
      modal: false,
      hover: 0,
    };
  }

  bookUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:4000/book/${this.props.bookToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.editTitle,
        author: this.state.editAuthor,
        genre: this.state.editGenre,
        pageLength: this.state.editPageLength,
        picture: this.state.editPicture,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    }).then((res) => {
      this.props.fetchBooks();
      this.props.updateOff();
    });
  };

  toggle = () => {
    this.props.updateOff();
  };
  imageSet = (image: string) => {
    this.setState({ editPicture: image });
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
              backgroundColor: '#f5f1e5',
              color: '#181d31',
              borderBottomColor: '#181d31',
            }}
            toggle={this.toggle}
          >
            Update Review
          </ModalHeader>
          <ModalBody style={{ backgroundColor: '#eeebe2', color: '#181d31' }}>
            <Form onSubmit={(e) => this.bookUpdate(e)}>
              <Row>
                <Col xs="9">
                  <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input
                      style={{ borderColor: '#181d31' }}
                      id="Title"
                      type="text"
                      name="Title"
                      value={this.state.editTitle}
                      placeholder="Title"
                      onChange={(e) =>
                        this.setState({ editTitle: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col xs="3">
                  <FormGroup>
                    <Label for="pageLength">Pages</Label>
                    <Input
                      style={{ borderColor: '#181d31' }}
                      id="pageLength"
                      type="text"
                      name="pageLength"
                      value={this.state.editPageLength}
                      placeholder="Pages"
                      onChange={(e) =>
                        this.setState({ editPageLength: e.target.value })
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
                      value={this.state.editGenre}
                      onChange={(e) =>
                        this.setState({ editGenre: e.target.value })
                      }
                      placeholder="Genre"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="author">Author</Label>
                    <Input
                      style={{ borderColor: '#181d31' }}
                      type="text"
                      name="author"
                      id="author"
                      value={this.state.editAuthor}
                      onChange={(e) =>
                        this.setState({ editAuthor: e.target.value })
                      }
                      placeholder="Author"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="picture">Picture</Label>
                <ImageUpload
                  token={this.props.token}
                  imageSet={this.imageSet}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter
            style={{
              backgroundColor: '#f5f1e5',
              color: '#181d31',
              borderTopColor: '#181d31',
            }}
          >
            <Button
              style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
              type="submit"
              onMouseEnter={this.enterBtn}
              onMouseLeave={this.leaveBtn}
            >
              {' '}
              Submit{' '}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UpdateBook;
