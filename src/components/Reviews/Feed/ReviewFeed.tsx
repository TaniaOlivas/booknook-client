import { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
} from 'reactstrap';
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
        <Card key={index} className="mb-3">
          <CardBody style={{ textAlign: 'left' }}>
            <CardTitle tag="h4">{review.title}</CardTitle>
            <CardSubtitle className="mb-0 text-muted" tag="h6">
              {review.genre}
            </CardSubtitle>
          </CardBody>
          <div className="row g-0">
            <CardBody /*style={{ textAlign: 'left' }}*/ className="col-md-2">
              {/* <CardTitle tag="h4">{review.title}</CardTitle> */}
              {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
              {review.genre}
            </CardSubtitle> */}

              <img
                src={review.picture}
                className="img-fluid rounded-start"
                alt="Card Image Cap"
                width="200px"
              />
            </CardBody>
            {/* <CardBody>
            <img
              style={{ textAlign: 'center' }}
              src={review.picture}
              // className="img-fluid rounded-start"
              width="200px"
              alt="Card Image Cap"
            />
          </CardBody> */}

            <div className="col-md-8">
              <CardBody className="card-body">
                {/* <CardTitle tag="h4">{review.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {review.genre}
                </CardSubtitle> */}
                <CardText className="card-text">
                  <small className="text-muted">{review.pageLength}</small>{' '}
                  <small className="text-muted">{review.rating}</small>
                </CardText>
                <CardText>{review.content}</CardText>
              </CardBody>
            </div>
          </div>
          <hr />
          <div className="row g-0">
            <CommentIndex
              token={this.props.token}
              review={review.id}
              userId={this.props.userId}
            />
          </div>
        </Card>
      );
    });
  };
  render() {
    return (
      <div
        style={{ textAlign: 'center', marginTop: '70px', marginBottom: '50px' }}
      >
        <h1>Book Reviews</h1>
        <Container>
          <Row className="mx-1">{this.reviewMapper()}</Row>
        </Container>
      </div>
    );
  }
}

export default ReviewFeed;
