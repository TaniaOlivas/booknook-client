import { Component } from 'react';
import { Button, Card, CardBody, CardText, Col, Row } from 'reactstrap';
import { book } from '../BooksIndex';
import APIURL from '../../../helpers/environment';

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
    fetch(`${APIURL}/book/${book.id}`, {
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
        <Card
          key={index}
          style={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderRadius: 0,
            marginTop: '1px',
            paddingBottom: '1px',
          }}
        >
          <div className="row g-0">
            <CardBody className="col-2 p-0">
              <img
                src={book.picture}
                className="img-fluid rounded-start"
                alt="Book Cover"
              />
            </CardBody>

            <div className="col-10 ">
              <CardBody className="card-body py-0 px-2 m-1">
                <Row xs="4">
                  <Col xs="4" className="p-0">
                    <CardText>{book.title}</CardText>
                  </Col>
                  <Col xs="3" className="p-0">
                    <CardText>{book.author}</CardText>
                  </Col>
                  <Col xs="3" className="p-0">
                    <CardText>{book.genre}</CardText>
                  </Col>
                  <Col xs="2" className="p-0">
                    <CardText>{book.pageLength}</CardText>
                  </Col>
                </Row>
              </CardBody>
              <CardBody className="pb-0">
                <Button
                  style={{
                    backgroundColor: '#181d31',
                    color: '#eeebe2',
                    width: '70px',
                    padding: '4px',
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
              </CardBody>
            </div>
          </div>
        </Card>
      );
    });
  };
  render() {
    return (
      <div>
        <Card
          className="rounded-top"
          style={{
            backgroundColor: '#181d31',
            color: 'white',
            borderRadius: 0,
          }}
        >
          <div className="row g-0">
            <CardBody className="col-2 p-0"></CardBody>

            <div className="col-10 ">
              <CardBody className="card-body py-0 px-2 m-1">
                <Row xs="4">
                  <Col xs="4" className="p-0">
                    <CardText
                      style={{
                        borderLeft: '1px solid white',
                      }}
                    >
                      Title
                    </CardText>
                  </Col>
                  <Col xs="3" className="p-0">
                    <CardText style={{ borderLeft: '1px solid white' }}>
                      Author
                    </CardText>
                  </Col>
                  <Col xs="3" className="p-0">
                    <CardText style={{ borderLeft: '1px solid white' }}>
                      Genre
                    </CardText>
                  </Col>
                  <Col xs="2" className="p-0">
                    <CardText
                      style={{
                        borderLeft: '1px solid white',
                      }}
                    >
                      Pages
                    </CardText>
                  </Col>
                </Row>
              </CardBody>
            </div>
          </div>
        </Card>
        <div className="rounded-bottom">{this.bookMapper()}</div>
      </div>
    );
  }
}

export default MyBookFeed;
