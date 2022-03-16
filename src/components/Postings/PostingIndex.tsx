import { Component } from 'react';
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
        console.log(data);
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
    console.log(post);
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
        <h2>Make a post!</h2>
      );
    return (
      <div style={{ textAlign: 'center', margin: '70px 0px 55px 0px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-1">
              <h1>Add your Book</h1>
              <CreatePost
                token={this.props.token}
                fetchPosts={this.fetchPosts}
              />
            </div>
            <div className="col-md-6 mb-1">
              <h1>Your Books</h1>
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
