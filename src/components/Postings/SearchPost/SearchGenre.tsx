import { Component } from 'react';
import {
  Button,
  Col,
  Card,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
  Input,
  Row,
} from 'reactstrap';
import { genre } from './SearchIndex';

interface SearchGenreProps {
  token: string;
  searchGenres: genre[];
  fetchGenre: Function;
}

interface SearchGenreState {}

class SearchGenre extends Component<SearchGenreProps, SearchGenreState> {
  constructor(props: SearchGenreProps) {
    super(props);
    this.state = { searchGenres: [] };
    this.genreMapper = this.genreMapper.bind(this);
  }

  genreMapper = () => {
    return this.props.searchGenres.map((genre, index) => {
      return (
        <Card key={index} className="mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <CardBody className="col-md-4">
              <img
                src={genre.picture}
                className="img-fluid rounded-start"
                alt="Card Image Cap"
              />
            </CardBody>
            <div className="col-md-8">
              <CardBody className="card-body">
                <CardTitle tag="h5">{genre.title}</CardTitle>
                <CardSubtitle>{genre.genre}</CardSubtitle>
                <CardText className="card-text">
                  <small className="text-muted">{genre.pageLength}</small>{' '}
                </CardText>
                <Button>Add to Book List</Button>
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
