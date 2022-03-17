import * as React from 'react';
import { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
interface FetchBooksProps {
  token: string;
  fetchList: Function;
}

interface FetchBooksState {
  searchTerm: string;
  BookResponse: Item[];
  searchResponse: Item[];
  title: string;
  author: string;
  genre: string;
  pageLength: number | string;
  picture: string;
}

interface BookResponse {
  items: Item[];
}

interface Item {
  volumeInfo: {
    authors: string[];
    categories: string[];
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
    pageCount: number;
    title: string;
  };
}

class FetchBooks extends Component<FetchBooksProps, FetchBooksState> {
  constructor(props: FetchBooksProps) {
    super(props);
    this.state = {
      searchTerm: '',
      BookResponse: [],
      searchResponse: [],
      title: '',
      author: '',
      genre: '',
      pageLength: '',
      picture: '',
    };
    this.bookMapper = this.bookMapper.bind(this);
  }

  fetchBooks = () => {
    const API_Key = 'AIzaSyBFwgVd0mk8AyhraRSm71loZgaALIDazvs';
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}&key=${API_Key}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data: BookResponse) => {
        this.setState({
          searchResponse: data.items,
        });
      })
      .catch((err) => console.error('Error:', err));
  };

  handleClick = (e: React.MouseEvent<HTMLButtonElement>, Item: Item) => {
    fetch('http://localhost:4000/book/create', {
      method: 'POST',
      body: JSON.stringify({
        title: Item.volumeInfo.title,
        author: Item.volumeInfo.authors[0],
        genre: Item.volumeInfo.categories[0],
        pageLength: Item.volumeInfo.pageCount,
        picture: Item.volumeInfo.imageLinks?.thumbnail,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.fetchList();
        this.setState({
          title: '',
          author: '',
          genre: '',
          pageLength: '',
          picture: '',
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
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
    return this.state.searchResponse.map((Item, index) => {
      return (
        <Card key={index} className="mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <CardHeader>
              <CardTitle tag="h5">{Item.volumeInfo.title}</CardTitle>
            </CardHeader>
            <CardBody className="col-4">
              <img
                src={Item.volumeInfo.imageLinks?.thumbnail}
                className="img-fluid rounded-start"
                alt="Book Cover"
              />
            </CardBody>
            <div className="col-8">
              <CardBody className="card-body">
                <CardBody>
                  <CardSubtitle>{Item.volumeInfo.authors[0]}</CardSubtitle>
                </CardBody>
                <CardText>
                  <small>Genre: {Item.volumeInfo.categories}</small>
                </CardText>
                <CardText>
                  <small>Pages: {Item.volumeInfo.pageCount}</small>
                </CardText>
              </CardBody>
              <CardBody>
                <Button
                  onClick={(e) => this.handleClick(e, Item)}
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                  onMouseEnter={this.enterBtn}
                  onMouseLeave={this.leaveBtn}
                >
                  Add to Reading List
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
        <Form>
          <Row xs="2">
            <Label>From Other Authors:</Label>
            <Col xs="9">
              <FormGroup>
                <Input
                  id="genre"
                  name="genre"
                  type="text"
                  placeholder="Search By Author, Title, Genre"
                  value={this.state.searchTerm}
                  onChange={(e) =>
                    this.setState({ searchTerm: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <Button
                  onClick={() => {
                    this.fetchBooks();
                  }}
                  style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                  onMouseEnter={this.enterBtn}
                  onMouseLeave={this.leaveBtn}
                >
                  Search
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>

        <div>{this.bookMapper()}</div>
      </div>
    );
  }
}

export default FetchBooks;
