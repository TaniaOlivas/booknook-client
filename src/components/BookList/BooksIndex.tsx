import * as React from 'react';
import { Component } from 'react';
import MyBookFeed from './BookFeed/MyBookFeed';
import ReviewBook from './ReviewBook/ReviewBook';

interface BooksIndexProps {
  token: string;
}

interface BooksIndexState {
  books: book[];
  updateActive: boolean;
  bookToUpdate: book;
}

export interface book {
  id: number;
  title: string;
  author: string;
  genre: string;
  pageLength: number | string;
  picture: string;
}

class BooksIndex extends Component<BooksIndexProps, BooksIndexState> {
  constructor(props: BooksIndexProps) {
    super(props);
    this.state = {
      books: [],
      updateActive: false,
      bookToUpdate: {} as book,
    };
  }

  fetchList = () => {
    fetch('http://localhost:4000/book/mine', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: book[]) => {
        console.log(data);
        this.setState({
          books: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  componentDidMount() {
    this.fetchList();
  }

  editUpdateBook = (book: book) => {
    this.setState({ bookToUpdate: book });
    console.log(book);
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  render() {
    const books =
      this.state.books.length >= 1 ? (
        <MyBookFeed
          books={this.state.books}
          fetchBooks={this.fetchList}
          token={this.props.token}
          updateOn={this.updateOn}
          editUpdateBook={this.editUpdateBook}
        />
      ) : (
        <h2>None yet! Add a Book</h2>
      );
    return (
      <div style={{ textAlign: 'center', margin: '70px 0px 55px 0px' }}>
        <div className="container">
          <div className="row">
            <div>{books}</div>
          </div>
          {this.state.updateActive ? (
            <ReviewBook
              bookToUpdate={this.state.bookToUpdate}
              updateOff={this.updateOff}
              token={this.props.token}
              fetchBooks={this.fetchList}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default BooksIndex;
