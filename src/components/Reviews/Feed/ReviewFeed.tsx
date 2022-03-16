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
  isOpen: boolean;
}

export interface review {
  id: number;
  title: string;
  author: string;
  genre: string;
  pageLength: number | string;
  picture: string;
  content: string;
  rating: string | number;
}

class ReviewFeed extends Component<ReviewFeedProps, ReviewFeedState> {
  constructor(props: ReviewFeedProps) {
    super(props);
    this.state = { reviews: [], isOpen: false };
    this.reviewMapper = this.reviewMapper.bind(this);
    // this.toggle = this.toggle.bind(this);
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

  handleToggle = () => {
    if (this.state.isOpen === true) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
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
    return this.state.reviews.map((review, index) => {
      return (
        <Card key={index} className="mb-3">
          <div className="row">
            <CardBody style={{ textAlign: 'left' }} className="col-9">
              <CardTitle tag="h4">{review.title}</CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                {review.author}
              </CardSubtitle>
            </CardBody>
            <CardBody className="col-3">
              <CardText className="card-text">
                <small className="text-muted">Pages:</small>{' '}
                <small className="text-muted">{review.pageLength}</small>{' '}
                <small>{review.genre}</small>
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
          </CardBody>

          <div className="mb-3 rounded">
            <Card>
              {this.state.isOpen === true ? (
                <CardBody
                  className="rounded"
                  style={{ backgroundColor: '#eeebe2', color: '#181d31' }}
                >
                  <CardTitle
                    onClick={this.handleToggle}
                    tag="h6"
                    className="mb-0"
                    style={{ textAlign: 'left' }}
                  >
                    Comments
                  </CardTitle>
                </CardBody>
              ) : (
                <CardBody
                  className="rounded"
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                >
                  <CardTitle
                    onClick={this.handleToggle}
                    tag="h6"
                    className="mb-0"
                    style={{ textAlign: 'left' }}
                  >
                    Comments
                  </CardTitle>
                </CardBody>
              )}

              {this.state.isOpen === true ? (
                <CardBody
                  className=""
                  style={{ backgroundColor: '#f5f1e5', color: '#181d31' }}
                >
                  <CommentIndex
                    token={this.props.token}
                    review={review.id}
                    userId={this.props.userId}
                  />
                </CardBody>
              ) : (
                <></>
              )}
            </Card>
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
