import { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import CommentIndex from './Comments/CommentIndex';

interface ReviewFeedProps {
  token: string;
  userId: string | number;
}

interface ReviewFeedState {
  reviews: review[];
}

export interface review {
  id: number;
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
        <Card key={index} className="mb-3" style={{ maxWidth: '800px' }}>
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
                <CommentIndex
                  token={this.props.token}
                  review={review.id}
                  userId={this.props.userId}
                />
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
        <div style={{ right: '1' }}>{this.reviewMapper()}</div>
      </div>
    );
  }
}

export default ReviewFeed;
