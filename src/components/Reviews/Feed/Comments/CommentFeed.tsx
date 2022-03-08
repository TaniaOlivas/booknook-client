import { Component } from 'react';
import { Button } from 'reactstrap';

import { comment } from './CommentIndex';

interface CommentFeedProps {
  comments: comment[];
  fetchComments: Function;
  token: string;
  updateOn: Function;
  editUpdateComment: Function;
}

interface CommentFeedState {}

class CommentFeed extends Component<CommentFeedProps, CommentFeedState> {
  constructor(props: CommentFeedProps) {
    super(props);
    this.state = { comments: [] };
    this.commentsMapper = this.commentsMapper.bind(this);
  }

  commentDelete = (comment: comment) => {
    fetch(`http://localhost:4000/post/${comment.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    }).then((res) => this.props.fetchComments());
  };

  commentsMapper = () => {
    return this.props.comments.map((comment, index) => {
      return (
        <div key={index}>
          <p>{comment.content}</p>
          {/* <Button
            onClick={() => {
              this.props.editUpdateComment(comment);
              this.props.updateOn();
            }}
          >
            Update
          </Button>{' '} */}
          <Button
            onClick={() => {
              this.commentDelete(comment);
            }}
          >
            Delete
          </Button>
        </div>
      );
    });
  };
  render() {
    return <div style={{ textAlign: 'center' }}>{this.commentsMapper()}</div>;
  }
}

export default CommentFeed;
