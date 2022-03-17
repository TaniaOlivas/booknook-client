import { Component } from 'react';
import { Container } from 'reactstrap';
import CreatePost from './CreatePost/CreatePost';
import PostsFeed from './PostsFeed/PostsFeed';
import UpdatePost from './UpdatePost/UpdatePost';

interface PostIndexProps {
  token: string;
}

interface PostIndexState {
  posts: post[];
  updateActive: boolean;
  postToUpdate: post;
}

export interface post {
  id: number;
  title: string;
  author: string;
  genre: string;
  pageLength: number | string;
  picture: string;
}

class PostIndex extends Component<PostIndexProps, PostIndexState> {
  constructor(props: PostIndexProps) {
    super(props);
    this.state = { posts: [], updateActive: false, postToUpdate: {} as post };
  }

  fetchPosts = () => {
    fetch('http://localhost:4000/post/mine', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: post[]) => {
        this.setState({
          posts: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  componentDidMount() {
    this.fetchPosts();
  }

  editUpdatePost = (post: post) => {
    this.setState({ postToUpdate: post });
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  render() {
    const posts =
      this.state.posts.length >= 1 ? (
        <PostsFeed
          posts={this.state.posts}
          fetchPosts={this.fetchPosts}
          token={this.props.token}
          updateOn={this.updateOn}
          editUpdatePost={this.editUpdatePost}
        />
      ) : (
        <div className="mt-4">
          <h3>None yet.</h3>
          <h3>Add your book!</h3>
        </div>
      );
    return (
      <div style={{ textAlign: 'center', margin: '65px 0px 55px 0px' }}>
        <div style={{ color: '#f5f1e5', backgroundColor: '#181d31' }}>
          <h1 className="py-2">Book Posting Home Page</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <Container
                className="rounded mb-2"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                }}
              >
                <h2>Add Your Book</h2>
              </Container>
              <CreatePost
                token={this.props.token}
                fetchPosts={this.fetchPosts}
              />
            </div>
            <div className="col-md-6 mb-1">
              <Container
                className="rounded mb-2"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                }}
              >
                <h2>Your Books</h2>
              </Container>
              {posts}
            </div>
          </div>
          {this.state.updateActive ? (
            <UpdatePost
              postToUpdate={this.state.postToUpdate}
              updateOff={this.updateOff}
              token={this.props.token}
              fetchPosts={this.fetchPosts}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default PostIndex;
