import { Component } from 'react';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import { book } from '../BooksIndex';

interface MyBookFeedProps {
  books: book[];
  fetchBooks: Function;
  token: string;
  updateOn: Function;
  editUpdateBook: Function;
}

interface MyBookFeedState {
  activeIndex: number;
  animating: boolean;
}

class MyBookFeed extends Component<MyBookFeedProps, MyBookFeedState> {
  constructor(props: MyBookFeedProps) {
    super(props);
    this.state = { activeIndex: 0, animating: false };
    this.bookMapper = this.bookMapper.bind(this);
  }

  bookDelete = (book: book) => {
    fetch(`http://localhost:4000/book/${book.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    }).then((res) => this.props.fetchBooks());
  };

  next = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === this.props.books.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.books.length - 1
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

  bookMapper = () => {
    return this.props.books.map((book, index) => {
      return (
        <tr key={index} style={{ borderBottom: '1px solid #181d31' }}>
          <th scope="row">
            <img
              style={{ textAlign: 'center' }}
              src={book.picture}
              className="img-fluid rounded"
              width="50px"
              alt="Book Cover"
            />
          </th>
          <td>{book.title}</td>
          <td style={{ width: '100px' }}>{book.author}</td>
          <td>{book.genre}</td>
          <td>{book.pageLength}</td>

          <td style={{ width: '100px' }}>
            <Button
              style={{
                backgroundColor: '#181d31',
                color: '#eeebe2',
                width: '70px',
                padding: '4px',
                marginBottom: '7px',
              }}
              onClick={() => {
                this.props.editUpdateBook(book);
                this.props.updateOn();
              }}
              onMouseEnter={this.enterBtn}
              onMouseLeave={this.leaveBtn}
            >
              Review
            </Button>{' '}
            <Button
              style={{
                backgroundColor: '#181d31',
                color: '#eeebe2',
                width: '70px',
                padding: '4px',
              }}
              onClick={() => {
                this.bookDelete(book);
              }}
              onMouseEnter={this.enterBtn}
              onMouseLeave={this.leaveBtn}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <Container
        className="rounded"
        style={{
          padding: 0,
          border: '1px solid #181d31',
          width: '500px',
          backgroundColor: '#fffef7',
        }}
      >
        <Row>
          <Col>
            <Table hover>
              <thead>
                <tr
                  style={{
                    borderBottom: '2px solid #181d31',
                    color: '#f5f1e5',
                    backgroundColor: '#181d31',
                  }}
                >
                  <th></th>
                  <th
                    style={{
                      borderLeft: '1px solid white',
                    }}
                  >
                    Title
                  </th>
                  <th
                    style={{
                      borderLeft: '1px solid white',
                    }}
                  >
                    Author
                  </th>
                  <th
                    style={{
                      borderLeft: '1px solid white',
                    }}
                  >
                    Genre
                  </th>
                  <th
                    style={{
                      borderLeft: '1px solid white',
                      borderRight: '1px solid white',
                    }}
                  >
                    Pages
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.bookMapper()}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyBookFeed;
