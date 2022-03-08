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
import { review } from '../ReviewIndex';

interface UpdateReviewProps {
  reviewToUpdate: review;
  updateOff: Function;
  token: string;
  fetchReviews: Function;
}

interface UpdateReviewState {
  editId: number;
  editTitle: string;
  editGenre: string;
  editPageLength: number | string;
  editPicture: string;
  editContent: string;
  editRating: string;
  modal: boolean;
}

class UpdateReview extends Component<UpdateReviewProps, UpdateReviewState> {
  constructor(props: UpdateReviewProps) {
    super(props);
    this.state = {
      editId: this.props.reviewToUpdate.id,
      editTitle: this.props.reviewToUpdate.title,
      editGenre: this.props.reviewToUpdate.genre,
      editPageLength: this.props.reviewToUpdate.pageLength,
      editPicture: this.props.reviewToUpdate.picture,
      editContent: this.props.reviewToUpdate.content,
      editRating: this.props.reviewToUpdate.rating,
      modal: false,
    };
  }

  reviewUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:4000/review/${this.props.reviewToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.editTitle,
        genre: this.state.editGenre,
        pageLength: this.state.editPageLength,
        picture: this.state.editPicture,
        content: this.state.editContent,
        rating: this.state.editRating,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    }).then((res) => {
      this.props.fetchReviews();
      this.props.updateOff();
    });
  };

  toggle = () => {
    this.props.updateOff();
  };

  render() {
    return (
      <div>
        <Modal isOpen={true} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.reviewUpdate(e)}>
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
                <Label for="rating">Rating</Label>
                <Input
                  id="rating"
                  type="text"
                  name="rating"
                  value={this.state.editRating}
                  placeholder="Rating"
                  onChange={(e) =>
                    this.setState({ editRating: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  id="content"
                  type="text"
                  name="content"
                  value={this.state.editContent}
                  placeholder="Content"
                  onChange={(e) =>
                    this.setState({ editContent: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="picture">Picture</Label>
                {/* <Input
                  id="picture"
                  type="file"
                  name="picture"
                  value={this.state.editPicture}
                  placeholder="Upload Image"
                  onChange={(e) =>
                    this.setState({ editPicture: e.target.value })
                  }
                /> */}
              </FormGroup>
              <Button type="submit"> Submit </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdateReview;
