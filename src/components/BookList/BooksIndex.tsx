import * as React from 'react';
import { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import APIURL from '../../helpers/environment';
import MyBookFeed from './BookFeed/MyBookFeed';
import ReviewBook from './ReviewBook/ReviewBook';
import FetchBooks from './SearchPosts/FetchBooks';
import SearchGenre from './SearchPosts/SearchGenre';
import SearchTitle from './SearchPosts/SearchTitle';

interface BooksIndexProps {
  token: string;
}

interface BooksIndexState {
  books: book[];
  searchGenres: genre[];
  searchTitles: title[];
  searchItem: string;
  updateActive: boolean;
  bookToUpdate: book;
}
export interface genre {
  id: number;
  title: string;
  author: string;
  genre: string;
  pageLength: number;
  picture: string;
}

export interface title {
  id: number;
  title: string;
  author: string;
  genre: string;
  pageLength: number;
  picture: string;
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
      searchGenres: [],
      searchTitles: [],
      searchItem: '',
      updateActive: false,
      bookToUpdate: {} as book,
    };
  }

  fetchList = () => {
    fetch(`${APIURL}/book/mine`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: book[]) => {
        this.setState({
          books: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  fetchGenre = () => {
    fetch(`${APIURL}/post/genre/${this.state.searchItem}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: genre[]) => {
        this.setState({
          searchGenres: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  fetchTitle = () => {
    fetch(`${APIURL}/post/title/${this.state.searchItem}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: title[]) => {
        this.setState({
          searchTitles: data,
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
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
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

  render() {
    const books =
      this.state.books.length >= 1 ? (
        <Container
          className="rounded p-0"
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
          }}
        >
          <MyBookFeed
            books={this.state.books}
            fetchBooks={this.fetchList}
            token={this.props.token}
            updateOn={this.updateOn}
            editUpdateBook={this.editUpdateBook}
          />
        </Container>
      ) : (
        <div className="mt-4">
          <h3>None yet.</h3>
          <h3>Add to your list!</h3>
        </div>
      );
    return (
      <div style={{ textAlign: 'center', margin: '65px 0px 55px 0px' }}>
        <div style={{ color: '#f5f1e5', backgroundColor: '#181d31' }}>
          <h1 className="py-2">Reading List</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <Container
                className="rounded mb-2"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                }}
              >
                <h2>Books To Read:</h2>
              </Container>

              {books}
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
            <div className="col-md-6 mb-1">
              <Container
                className="rounded mb-2"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                }}
              >
                <h2>Search For Books:</h2>
              </Container>

              <div>
                <Form>
                  <Row xs="2">
                    <Label>From Our Authors:</Label>
                    <Col xs="9">
                      <FormGroup>
                        <Input
                          id="posts"
                          name="posts"
                          type="text"
                          placeholder="Search By Title or Genre"
                          value={this.state.searchItem}
                          onChange={(e) =>
                            this.setState({ searchItem: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Button
                          onClick={() => {
                            this.fetchTitle();
                            this.fetchGenre();
                          }}
                          style={{
                            backgroundColor: '#181d31',
                            color: '#eeebe2',
                          }}
                          onMouseEnter={this.enterBtn}
                          onMouseLeave={this.leaveBtn}
                        >
                          Search
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div>
                <FetchBooks
                  fetchList={this.fetchList}
                  token={this.props.token}
                />
              </div>
              <div>
                <SearchGenre
                  token={this.props.token}
                  searchGenres={this.state.searchGenres}
                  fetchGenre={this.fetchGenre}
                  fetchList={this.fetchList}
                />
                <SearchTitle
                  token={this.props.token}
                  searchTitles={this.state.searchTitles}
                  fetchTitle={this.fetchTitle}
                  fetchList={this.fetchList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksIndex;
