import { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Carousel,
  CarouselIndicators,
  CarouselItem,
  CarouselControl,
  CardSubtitle,
  Container,
} from 'reactstrap';
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
        <CarouselItem
          onExiting={() => this.setState({ animating: true })}
          onExited={() => this.setState({ animating: false })}
        >
          <Card
            key={index}
            style={{
              borderColor: '#ccc',
            }}
          >
            <div className="row">
              <CardBody style={{ textAlign: 'left' }} className="col-9">
                <CardTitle tag="h4">{book.title}</CardTitle>
                <CardSubtitle className="text-muted" tag="h6">
                  {book.genre}
                </CardSubtitle>
              </CardBody>
              <CardBody className="col-3">
                <CardText className="card-text">
                  <small className="text-muted">Pages:</small>{' '}
                  <small className="text-muted">{book.pageLength}</small>
                </CardText>
              </CardBody>
            </div>
            <CardBody
              className="my-0 rounded"
              style={{ backgroundColor: '#eeebe2' }}
            >
              <img
                style={{ textAlign: 'center' }}
                src={book.picture}
                className="img-fluid rounded"
                width="200px"
                alt="Book Cover"
              />
            </CardBody>
            <CardBody className="card-body mb-3">
              <CardText>{book.author}</CardText>
              <CardBody>
                <Button
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                  onClick={() => {
                    this.props.editUpdateBook(book);
                    this.props.updateOn();
                  }}
                  onMouseEnter={this.enterBtn}
                  onMouseLeave={this.leaveBtn}
                >
                  Update
                </Button>{' '}
                <Button
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                  onClick={() => {
                    this.bookDelete(book);
                  }}
                  onMouseEnter={this.enterBtn}
                  onMouseLeave={this.leaveBtn}
                >
                  Delete
                </Button>
              </CardBody>
            </CardBody>
          </Card>
        </CarouselItem>
      );
    });
  };
  render() {
    return (
      <Container
        className="rounded"
        style={{
          backgroundColor: 'white',

          padding: 0,
        }}
      >
        <Carousel
          dark
          activeIndex={this.state.activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            activeIndex={this.state.activeIndex}
            items={this.props.books}
            onClickHandler={this.goToIndex}
            className="mb-1"
          />
          {this.bookMapper()}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
      </Container>
    );
  }
}

export default MyBookFeed;
