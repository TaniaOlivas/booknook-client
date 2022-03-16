import { Component } from 'react';
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

  editUpdateReview = (review: review) => {
    this.setState({ reviewToUpdate: review });
    console.log(review);
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
        <h2>None yet! Create one!</h2>
      );
    return (
      <div style={{ textAlign: 'center', margin: '75px 0px 55px 0px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-1 rounded">
              <h1>Create a Review</h1>
              <CreateReview
                token={this.props.token}
                fetchReviews={this.fetchReviews}
              />
            </div>
            <div className="col-md-6 mb-1">
              <h1>Your Reviews</h1>

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
