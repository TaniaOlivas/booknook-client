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
import APIURL from '../../../helpers/environment';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { post } from '../PostingIndex';

interface UpdatePostProps {
  postToUpdate: post;
  updateOff: Function;
  token: string;
  fetchPosts: Function;
}

interface UpdatePostState {
  editId: number;
  editTitle: string;
  editAuthor: string;
  editGenre: string;
  editPageLength: number | string;
  editPicture: string;
  modal: boolean;
}

class UpdatePost extends Component<UpdatePostProps, UpdatePostState> {
  constructor(props: UpdatePostProps) {
    super(props);
    this.state = {
      editId: this.props.postToUpdate.id,
      editTitle: this.props.postToUpdate.title,
      editAuthor: this.props.postToUpdate.author,
      editGenre: this.props.postToUpdate.genre,
      editPageLength: this.props.postToUpdate.pageLength,
      editPicture: this.props.postToUpdate.picture,
      modal: false,
    };
  }

  postUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${APIURL}/post/${this.props.postToUpdate.id}`, {
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
      this.props.fetchPosts();
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
              backgroundColor: '#181d31',
              color: '#fffef7',
              borderBottomColor: '#181d31',
            }}
            toggle={this.toggle}
          >
            Update Book
          </ModalHeader>
          <ModalBody style={{ backgroundColor: '#fffef7', color: '#181d31' }}>
            <Form onSubmit={(e) => this.postUpdate(e)}>
              <Row xs="2">
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
                    <Label for="pageLength">Page Length</Label>
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
                    <Label for="author">Author</Label>
                    <Input
                      style={{ borderColor: '#181d31' }}
                      id="author"
                      type="text"
                      name="author"
                      value={this.state.editAuthor}
                      placeholder="Author"
                      onChange={(e) =>
                        this.setState({ editAuthor: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
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
              </Row>

              <FormGroup>
                <Label for="picture">Picture</Label>
                <ImageUpload
                  token={this.props.token}
                  imageSet={this.imageSet}
                />
              </FormGroup>
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
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdatePost;
