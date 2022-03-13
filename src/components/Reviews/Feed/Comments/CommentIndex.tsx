import { Component } from 'react';
import CreateComment from './CommentCreate';
import CommentFeed from './CommentFeed';
import UpdateComment from './UpdateComment';

interface CommentIndexProps {
  token: string;
  review: number;
  userId: string | number;
}

interface CommentIndexState {
  comments: comment[];
  updateActive: boolean;
  commentToUpdate: comment;
  refreshComments: boolean;
}

export interface comment {
  id: number;
  content: string;
  userId: number;
  bookReviewId: number;
}

class CommentIndex extends Component<CommentIndexProps, CommentIndexState> {
  constructor(props: CommentIndexProps) {
    super(props);
    this.state = {
      comments: [],
      updateActive: false,
      commentToUpdate: {} as comment,
      refreshComments: true,
    };
  }

  fetchComments = () => {
    fetch(`http://localhost:4000/comment/${this.props.review}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: comment[]) => {
        this.setState({
          comments: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  componentDidMount() {
    this.fetchComments();
  }

  editUpdateComment = (comment: comment) => {
    this.setState({ commentToUpdate: comment });
    console.log(comment);
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  render() {
    const comment =
      this.state.comments.length >= 1 ? (
        <CommentFeed
          comments={this.state.comments}
          fetchComments={this.fetchComments}
          token={this.props.token}
          updateOn={this.updateOn}
          editUpdateComment={this.editUpdateComment}
          refreshComments={this.state.refreshComments}
          userId={this.props.userId}
        />
      ) : (
        <h5>No Comments</h5>
      );
    return (
      <div>
        <div>
          <div>{comment}</div>
          <div>
            <CreateComment
              review={this.props.review}
              token={this.props.token}
              refreshComments={this.state.refreshComments}
              fetchComments={this.fetchComments}
            />
          </div>
          {this.state.updateActive ? (
            <UpdateComment
              commentToUpdate={this.state.commentToUpdate}
              updateOff={this.updateOff}
              token={this.props.token}
              fetchComments={this.fetchComments}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default CommentIndex;
