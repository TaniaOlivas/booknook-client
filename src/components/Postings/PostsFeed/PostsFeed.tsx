import { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { post } from '../PostingIndex';

interface PostsFeedProps {
  posts: post[];
  fetchPosts: Function;
  token: string;
  updateOn: Function;
  editUpdatePost: Function;
}

interface PostsFeedState {}

class PostsFeed extends Component<PostsFeedProps, PostsFeedState> {
  constructor(props: PostsFeedProps) {
    super(props);
    this.state = { posts: [] };
    this.postsMapper = this.postsMapper.bind(this);
  }

  postDelete = (post: post) => {
    fetch(`http://localhost:4000/post/${post.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    }).then((res) => this.props.fetchPosts());
  };

  postsMapper = () => {
    return this.props.posts.map((post, index) => {
      return (
        <Card key={index} className="mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <CardBody className="col-md-4">
              <img
                src={post.picture}
                className="img-fluid rounded-start"
                alt="Card Image Cap"
              />
            </CardBody>
            <div className="col-md-8">
              <CardBody className="card-body">
                <CardTitle tag="h5">{post.title}</CardTitle>
                <CardSubtitle>{post.genre}</CardSubtitle>
                <CardText className="card-text">
                  <small className="text-muted">{post.pageLength}</small>{' '}
                </CardText>
                <Button
                  onClick={() => {
                    this.props.editUpdatePost(post);
                    this.props.updateOn();
                  }}
                >
                  Update
                </Button>{' '}
                <Button
                  onClick={() => {
                    this.postDelete(post);
                  }}
                >
                  Delete
                </Button>
              </CardBody>
            </div>
          </div>
        </Card>
      );
    });
  };
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Hello from PostFeed</h1>
        {this.postsMapper()}
      </div>
    );
  }
}

export default PostsFeed;
