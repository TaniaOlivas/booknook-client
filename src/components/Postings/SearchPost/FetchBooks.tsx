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
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
interface FetchBooksProps {}

interface FetchBooksState {
  searchTerm: string;
  BookResponse: Item[];
  searchResponse: Item[];
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
    };
    this.bookMapper = this.bookMapper.bind(this);
  }

  fetchBooks = () => {
    const API_Key = 'AIzaSyBFwgVd0mk8AyhraRSm71loZgaALIDazvs';
    const URL = 'https://www.googleapis.com/books/v1/volumes';
    fetch(URL + `?q=${this.state.searchTerm}` + `&key=${API_Key}`)
      .then((res) => res.json())
      .then((data: BookResponse) => {
        console.log(data.items);
        this.setState({
          searchResponse: data.items,
        });
      })
      .catch((err) => console.log(err));
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
                <CardText>
                  <CardSubtitle tag="h6">
                    {Item.volumeInfo.authors[0]}
                  </CardSubtitle>
                </CardText>
                <CardText>
                  <small>Genre: {Item.volumeInfo.categories[0]}</small>
                </CardText>
                <CardText>
                  <small>Pages: {Item.volumeInfo.pageCount}</small>
                </CardText>
              </CardBody>
              <CardBody>
                <Button
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
      <Container>
        <Form>
          <Row>
            <FormGroup>
              <Input
                id="genre"
                name="genre"
                type="text"
                placeholder="Search By Author, Title, Genre"
                value={this.state.searchTerm}
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
              />
            </FormGroup>

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
          </Row>
        </Form>

        <div>{this.bookMapper()}</div>
      </Container>
    );
  }
}

export default FetchBooks;
