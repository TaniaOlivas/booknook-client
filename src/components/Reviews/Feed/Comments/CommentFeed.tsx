import { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardText,
  Container,
  Row,
} from 'reactstrap';
import APIURL from '../../../../helpers/environment';
import { comment } from './CommentIndex';

interface CommentFeedProps {
  comments: comment[];
  fetchComments: Function;
  token: string;
  updateOn: Function;
  editUpdateComment: Function;
  refreshComments: boolean;
  userId: string | number;
}

interface CommentFeedState {}

class CommentFeed extends Component<CommentFeedProps, CommentFeedState> {
  constructor(props: CommentFeedProps) {
    super(props);
    this.state = { comments: [] };
    this.commentsMapper = this.commentsMapper.bind(this);
  }

  commentDelete = (comment: comment) => {
    fetch(`${APIURL}/comment/${comment.id}`, {
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
        <Row key={index}>
          <Card
            className="rounded"
            style={{ border: '0', paddingLeft: '0', paddingRight: '0' }}
          >
            <CardBody>
              <CardText style={{ fontSize: '14px' }}>
                {comment.content}
              </CardText>
            </CardBody>
            <CardFooter
              style={{
                height: '30px',
                padding: 0,
                backgroundColor: '#fffef7',
                border: '0',
              }}
            >
              {this.props.userId == comment.userId ? (
                <div style={{ textAlign: 'right', paddingRight: '5px' }}>
                  <a
                    style={{
                      textDecoration: 'underline',
                      fontSize: '12px',
                    }}
                    onClick={() => {
                      this.commentDelete(comment);
                    }}
                  >
                    Delete
                  </a>{' '}
                  |{' '}
                  <a
                    style={{ textDecoration: 'underline', fontSize: '12px' }}
                    onClick={() => {
                      this.props.editUpdateComment(comment);
                      this.props.updateOn();
                    }}
                  >
                    Update
                  </a>
                </div>
              ) : (
                <></>
              )}
            </CardFooter>
          </Card>
        </Row>
      );
    });
  };
  render() {
    return (
      <Container style={{ height: '150px', overflowY: 'scroll' }}>
        {this.commentsMapper()}
      </Container>
    );
  }
}

export default CommentFeed;
