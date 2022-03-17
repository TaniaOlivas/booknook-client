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
    fetch(`http://localhost:4000/comment/${this.props.commentToUpdate.id}`, {
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
            Update Comment
          </ModalHeader>
          <ModalBody style={{ backgroundColor: '#fffef7', color: '#181d31' }}>
            <Form onSubmit={(e) => this.commentUpdate(e)}>
              <FormGroup>
                <Label for="content">Comment</Label>
                <Input
                  style={{ borderColor: '#181d31' }}
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
              <Button
                style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                type="submit"
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                {' '}
                Submit{' '}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdateComment;
