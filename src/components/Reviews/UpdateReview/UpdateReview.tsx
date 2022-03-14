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
  editRating: string | number;
  modal: boolean;
  hover: number | string;
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
      hover: 0,
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
            <Form onSubmit={(e) => this.reviewUpdate(e)}>
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
                    <Label for="rating">Rating</Label>
                    <div className="star-rating">
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={
                              index <= this.state.editRating ? 'on' : 'off'
                            }
                            onClick={() => this.setState({ editRating: index })}
                            onMouseEnter={() => this.setState({ hover: index })}
                            onMouseLeave={() =>
                              this.setState({ hover: this.state.editRating })
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

              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  style={{ borderColor: '#181d31' }}
                  id="content"
                  type="textarea"
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

export default UpdateReview;
