import { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
  CardHeader,
} from 'reactstrap';
import APIURL from '../../../helpers/environment';
import { genre } from '../BooksIndex';

interface SearchGenreProps {
  token: string;
  searchGenres: genre[];
  fetchGenre: Function;
  fetchList: Function;
}

interface SearchGenreState {}

class SearchGenre extends Component<SearchGenreProps, SearchGenreState> {
  constructor(props: SearchGenreProps) {
    super(props);
    this.state = { searchGenres: [] };
    this.genreMapper = this.genreMapper.bind(this);
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement>, genre: genre) => {
    fetch(`${APIURL}/book/create`, {
      method: 'POST',
      body: JSON.stringify({
        title: genre.title,
        author: genre.author,
        genre: genre.genre,
        pageLength: genre.pageLength,
        picture: genre.picture,
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

  genreMapper = () => {
    return this.props.searchGenres.map((genre, index) => {
      return (
        <Card key={index} className="mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <CardHeader>
              <CardTitle tag="h5">{genre.title}</CardTitle>
            </CardHeader>
            <CardBody className="col-4">
              <img
                src={genre.picture}
                className="img-fluid rounded-start"
                alt="Book Cover"
                width="115px"
              />
            </CardBody>
            <div className="col-8">
              <CardBody className="card-body">
                <CardText>
                  <CardSubtitle tag="h6">{genre.author}</CardSubtitle>
                </CardText>
                <CardText>
                  <small>Genre: {genre.genre}</small>
                </CardText>
                <CardText>
                  <small>Pages: {genre.pageLength}</small>
                </CardText>
              </CardBody>
              <CardBody>
                <Button
                  onClick={(e) => this.handleClick(e, genre)}
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
    return <div>{this.genreMapper()}</div>;
  }
}

export default SearchGenre;
