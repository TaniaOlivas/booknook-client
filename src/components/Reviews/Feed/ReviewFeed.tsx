import { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardLink,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

interface ReviewFeedProps {
  token: string;
}

interface ReviewFeedState {
  reviews: review[];
}

interface review {
  title: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  content: string;
  rating: string;
}

class ReviewFeed extends Component<ReviewFeedProps, ReviewFeedState> {
  constructor(props: ReviewFeedProps) {
    super(props);
    this.state = { reviews: [] };
    this.reviewMapper = this.reviewMapper.bind(this);
  }

  fetchReviews = () => {
    fetch('http://localhost:4000/review/all', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          reviews: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  componentDidMount() {
    this.fetchReviews();
  }

  reviewMapper = () => {
    return this.state.reviews.map((review, index) => {
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
                  <small className="text-muted">{review.rating}</small>
                </CardText>
                <CardText>{review.content}</CardText>
                <CardLink href="#">Comment</CardLink>
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
        <h1>Hello from ReviewFeed</h1>
        {this.reviewMapper()}
      </div>
    );
  }
}

export default ReviewFeed;
