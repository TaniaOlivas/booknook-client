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
import { comment } from './CommentIndex';

interface UpdateCommentProps {
  commentToUpdate: comment;
  updateOff: Function;
  token: string;
  fetchComments: Function;
}

interface UpdateCommentState {
  editContent: string;
  modal: boolean;
}

class UpdateComment extends Component<UpdateCommentProps, UpdateCommentState> {
  constructor(props: UpdateCommentProps) {
    super(props);
    this.state = {
      editContent: this.props.commentToUpdate.content,
      modal: false,
    };
  }

  commentUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:4000/post/${this.props.commentToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content: this.state.editContent,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    }).then((res) => {
      this.props.fetchComments();
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
          <ModalHeader toggle={this.toggle}>Update Comment</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.commentUpdate(e)}>
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
              <Button type="submit"> Submit </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdateComment;
