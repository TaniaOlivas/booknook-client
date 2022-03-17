import { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselItem,
} from 'reactstrap';
import { post } from '../PostingIndex';

interface PostsFeedProps {
  posts: post[];
  fetchPosts: Function;
  token: string;
  updateOn: Function;
  editUpdatePost: Function;
}

interface PostsFeedState {
  activeIndex: number;
  animating: boolean;
}

class PostsFeed extends Component<PostsFeedProps, PostsFeedState> {
  constructor(props: PostsFeedProps) {
    super(props);
    this.state = { activeIndex: 0, animating: false };

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

  next = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === this.props.posts.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.posts.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = (newIndex: number) => {
    if (this.state.animating) return;
    this.setState({ activeIndex: newIndex });
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

  postsMapper = () => {
    return this.props.posts.map((post, index) => {
      return (
        <CarouselItem
          key={index}
          onExiting={() => this.setState({ animating: true })}
          onExited={() => this.setState({ animating: false })}
        >
          <Card
            style={{
              borderColor: '#ccc',
            }}
          >
            <div className="row mx-0">
              <CardBody style={{ textAlign: 'left' }} className="col-8">
                <CardTitle tag="h4">{post.title}</CardTitle>
                <CardSubtitle className="text-muted" tag="h6">
                  {post.author}
                </CardSubtitle>
              </CardBody>
              <CardBody style={{ textAlign: 'right' }} className="col-4">
                <CardText className="card-text">
                  <small className="text-muted">Pages:</small>{' '}
                  <small className="text-muted">{post.pageLength}</small>{' '}
                  <small>{post.genre}</small>
                </CardText>
              </CardBody>
            </div>
            <CardBody
              className="my-0 mx-3 rounded"
              style={{ backgroundColor: '#f5f1e5' }}
            >
              <img
                style={{ textAlign: 'center' }}
                src={post.picture}
                className="img-fluid rounded"
                width="200px"
                alt="Book Cover"
              />
            </CardBody>
            <CardBody className="card-body mb-3">
              <CardBody>
                <Button
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                  onClick={() => {
                    this.props.editUpdatePost(post);
                    this.props.updateOn();
                  }}
                  onMouseEnter={this.enterBtn}
                  onMouseLeave={this.leaveBtn}
                >
                  Update
                </Button>{' '}
                <Button
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                  onClick={() => {
                    this.postDelete(post);
                  }}
                  onMouseEnter={this.enterBtn}
                  onMouseLeave={this.leaveBtn}
                >
                  Delete
                </Button>
              </CardBody>
            </CardBody>
          </Card>
        </CarouselItem>
      );
    });
  };
  render() {
    return (
      <Container
        className="rounded"
        style={{
          backgroundColor: 'white',

          padding: 0,
        }}
      >
        <Carousel
          dark
          activeIndex={this.state.activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            activeIndex={this.state.activeIndex}
            items={this.props.posts}
            onClickHandler={this.goToIndex}
            className="mb-1"
          />
          {this.postsMapper()}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
      </Container>
    );
  }
}

export default PostsFeed;
