import { Component } from 'react';
import { Container } from 'reactstrap';
import CreateReview from './CreateReview/CreateReview';
import MyReviewFeed from './Feed/MyReviewFeed';
import UpdateReview from './UpdateReview/UpdateReview';

interface ReviewIndexProps {
  token: string;
}

interface ReviewIndexState {
  reviews: review[];
  updateActive: boolean;
  reviewToUpdate: review;
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

class ReviewIndex extends Component<ReviewIndexProps, ReviewIndexState> {
  constructor(props: ReviewIndexProps) {
    super(props);
    this.state = {
      reviews: [],
      updateActive: false,
      reviewToUpdate: {} as review,
    };
  }

  fetchReviews = () => {
    fetch('http://localhost:4000/review/mine', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: review[]) => {
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

  editUpdateReview = (review: review) => {
    this.setState({ reviewToUpdate: review });
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  render() {
    const reviews =
      this.state.reviews.length >= 1 ? (
        <MyReviewFeed
          reviews={this.state.reviews}
          fetchReviews={this.fetchReviews}
          token={this.props.token}
          updateOn={this.updateOn}
          editUpdateReview={this.editUpdateReview}
        />
      ) : (
        <div className="mt-4">
          <h3>None yet.</h3>
          <h3>Create one!</h3>
        </div>
      );
    return (
      <div style={{ textAlign: 'center', margin: '65px 0px 55px 0px' }}>
        <div style={{ color: '#f5f1e5', backgroundColor: '#181d31' }}>
          <h1 className="py-2">Review Home Page</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3 rounded">
              <Container
                className="rounded mb-2"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                }}
              >
                <h2>Create a Review</h2>
              </Container>
              <CreateReview
                token={this.props.token}
                fetchReviews={this.fetchReviews}
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
                <h2>Your Reviews</h2>
              </Container>

              {reviews}
            </div>
          </div>
          {this.state.updateActive ? (
            <UpdateReview
              reviewToUpdate={this.state.reviewToUpdate}
              updateOff={this.updateOff}
              token={this.props.token}
              fetchReviews={this.fetchReviews}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default ReviewIndex;
