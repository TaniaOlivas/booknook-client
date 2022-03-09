import { Component } from 'react';
import {
  Col,
  Container,
  Row,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import SearchGenre from './SearchGenre';
import SearchTitle from './SearchTitle';
interface SearchIndexProps {
  token: string;
}

interface SearchIndexState {
  searchGenres: genre[];
  searchTitles: title[];
  searchGenre: string;
  searchTitle: string;
}

export interface genre {
  id: number;
  title: string;
  genre: string;
  pageLength: number;
  picture: string;
}
export interface title {
  id: number;
  title: string;
  genre: string;
  pageLength: number;
  picture: string;
}

class SearchIndex extends Component<SearchIndexProps, SearchIndexState> {
  constructor(props: SearchIndexProps) {
    super(props);
    this.state = {
      searchGenres: [],
      searchTitles: [],
      searchTitle: '',
      searchGenre: '',
    };
  }

  fetchGenre = () => {
    fetch(`http://localhost:4000/post/genre/${this.state.searchGenre}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: genre[]) => {
        console.log(data);
        this.setState({
          searchGenres: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  fetchTitle = () => {
    fetch(`http://localhost:4000/post/title/${this.state.searchTitle}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data: title[]) => {
        console.log(data);
        this.setState({
          searchTitles: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Hello From SearchIndex</h1>
        <Form>
          <FormGroup>
            <Label for="genre">By Genre:</Label>
            <Input
              id="genre"
              name="genre"
              type="text"
              placeholder="Search By Genre"
              value={this.state.searchGenre}
              onChange={(e) => this.setState({ searchGenre: e.target.value })}
            />
            <FormGroup>
              <Label for="title">By Title:</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Search By Title"
                value={this.state.searchTitle}
                onChange={(e) => this.setState({ searchTitle: e.target.value })}
              />
            </FormGroup>
            <div>
              <Button
                onClick={() => {
                  this.fetchTitle();
                  this.fetchGenre();
                }}
              >
                Search
              </Button>
            </div>
          </FormGroup>
        </Form>
        <SearchGenre
          token={this.props.token}
          searchGenres={this.state.searchGenres}
          fetchGenre={this.fetchGenre}
        />
        <SearchTitle
          token={this.props.token}
          searchTitles={this.state.searchTitles}
          fetchTitle={this.fetchTitle}
        />
      </div>
    );
  }
}

export default SearchIndex;
