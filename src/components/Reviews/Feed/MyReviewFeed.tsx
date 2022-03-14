import { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Carousel,
  CarouselIndicators,
  CarouselItem,
  CarouselControl,
  CardSubtitle,
  Container,
  Row,
} from 'reactstrap';
import { review } from '../ReviewIndex';

interface MyReviewFeedProps {
  reviews: review[];
  fetchReviews: Function;
  token: string;
  updateOn: Function;
  editUpdateReview: Function;
}

interface MyReviewFeedState {
  activeIndex: number;
  animating: boolean;
}

class MyReviewFeed extends Component<MyReviewFeedProps, MyReviewFeedState> {
  constructor(props: MyReviewFeedProps) {
    super(props);
    this.state = { activeIndex: 0, animating: false };
    this.reviewMapper = this.reviewMapper.bind(this);
  }

  reviewDelete = (review: review) => {
    fetch(`http://localhost:4000/review/${review.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    }).then((res) => this.props.fetchReviews());
  };

  next = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === this.props.reviews.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.reviews.length - 1
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

  reviewMapper = () => {
    return this.props.reviews.map((review, index) => {
      return (
        <CarouselItem
          onExiting={() => this.setState({ animating: true })}
          onExited={() => this.setState({ animating: false })}
        >
          <Card
            key={index}
            style={{
              borderColor: '#ccc',
            }}
          >
            <div className="row">
              <CardBody style={{ textAlign: 'left' }} className="col-9">
                <CardTitle tag="h4">{review.title}</CardTitle>
                <CardSubtitle className="text-muted" tag="h6">
                  {review.genre}
                </CardSubtitle>
              </CardBody>
              <CardBody className="col-3">
                <CardText className="card-text">
                  <small className="text-muted">Pages:</small>{' '}
                  <small className="text-muted">{review.pageLength}</small>
                </CardText>
              </CardBody>
            </div>
            <CardBody
              className="my-0 rounded"
              style={{ backgroundColor: '#eeebe2' }}
            >
              <img
                style={{ textAlign: 'center' }}
                src={review.picture}
                className="img-fluid rounded"
                width="200px"
                alt="Card Image Cap"
              />
            </CardBody>
            <CardBody className="card-body mb-3">
              <CardText className="card-text">
                <div className="star-rating">
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className={index <= review.rating ? 'on' : 'off'}
                      >
                        <span className="star">&#9733;</span>
                      </button>
                    );
                  })}
                </div>
              </CardText>
              <CardText>{review.content}</CardText>
              <CardBody>
                <Button
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                  onClick={() => {
                    this.props.editUpdateReview(review);
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
                    this.reviewDelete(review);
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
            items={this.props.reviews}
            onClickHandler={this.goToIndex}
            className="mb-1"
          />
          {this.reviewMapper()}
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

export default MyReviewFeed;
