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
} from 'reactstrap';
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
      editGenre: this.props.postToUpdate.genre,
      editPageLength: this.props.postToUpdate.pageLength,
      editPicture: this.props.postToUpdate.picture,
      modal: false,
    };
  }

  postUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:4000/post/${this.props.postToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.editTitle,
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
  render() {
    return (
      <div>
        <Modal isOpen={true} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.postUpdate(e)}>
              <FormGroup>
                <Label for="Title">Title</Label>
                <Input
                  id="Title"
                  type="text"
                  name="Title"
                  value={this.state.editTitle}
                  placeholder="Title"
                  onChange={(e) => this.setState({ editTitle: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="genre">Genre</Label>
                <Input
                  type="text"
                  name="genre"
                  id="genre"
                  value={this.state.editGenre}
                  onChange={(e) => this.setState({ editGenre: e.target.value })}
                  placeholder="Genre"
                />
              </FormGroup>
              <FormGroup>
                <Label for="pageLength">Page Length</Label>
                <Input
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
              <FormGroup>
                <Label for="picture">Picture</Label>
                <ImageUpload
                  token={this.props.token}
                  imageSet={this.imageSet}
                />
              </FormGroup>
              <Button type="submit"> Submit </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdatePost;
