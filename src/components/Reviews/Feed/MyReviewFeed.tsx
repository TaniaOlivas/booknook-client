import { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardLink,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { review } from '../ReviewIndex';

interface MyReviewFeedProps {
  reviews: review[];
  fetchReviews: Function;
  token: string;
  updateOn: Function;
  editUpdateReview: Function;
}

interface MyReviewFeedState {}

class MyReviewFeed extends Component<MyReviewFeedProps, MyReviewFeedState> {
  constructor(props: MyReviewFeedProps) {
    super(props);
    this.state = { reviews: [] };
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

  reviewMapper = () => {
    return this.props.reviews.map((review, index) => {
      return (
        <Card key={index} className="mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <CardBody className="col-md-4">
              <img
                src={review.picture}
                className="img-fluid rounded-start"
                alt="Card Image Cap"
              />
            </CardBody>
            <div className="col-md-8">
              <CardBody className="card-body">
                <CardTitle tag="h5">{review.title}</CardTitle>
                <CardSubtitle>{review.genre}</CardSubtitle>
                <CardText className="card-text">
                  <small className="text-muted">{review.pageLength}</small>{' '}
                </CardText>
                <Button
                  onClick={() => {
                    this.props.editUpdateReview(review);
                    this.props.updateOn();
                  }}
                >
                  Update
                </Button>{' '}
                <Button
                  onClick={() => {
                    this.reviewDelete(review);
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
        <h3>Hello from MyReviewFeed</h3>
        {this.reviewMapper()}
      </div>
    );
  }
}

export default MyReviewFeed;
