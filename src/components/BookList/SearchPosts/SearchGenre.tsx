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
                  <CardSubtitle tag="h6">Author:</CardSubtitle>
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
