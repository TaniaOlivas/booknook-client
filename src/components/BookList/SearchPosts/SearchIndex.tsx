import { Component } from 'react';
import {
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
} from 'reactstrap';
import FetchBooks from './FetchBooks';
import SearchGenre from './SearchGenre';
import SearchTitle from './SearchTitle';
interface SearchIndexProps {
  token: string;
}

interface SearchIndexState {
  searchGenres: genre[];
  searchTitles: title[];
  searchItem: string;
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

class SearchIndex extends Component<SearchIndexProps, SearchIndexState> {
  constructor(props: SearchIndexProps) {
    super(props);
    this.state = {
      searchGenres: [],
      searchTitles: [],
      searchItem: '',
    };
  }

  fetchGenre = () => {
    fetch(`http://localhost:4000/post/genre/${this.state.searchItem}`, {
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
    fetch(`http://localhost:4000/post/title/${this.state.searchItem}`, {
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
    return (
      <div style={{ textAlign: 'center', margin: '70px 0px 55px 0px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-1">
              <Form>
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
                <FormGroup>
                  <Button
                    onClick={() => {
                      this.fetchTitle();
                      this.fetchGenre();
                    }}
                    style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                    onMouseEnter={this.enterBtn}
                    onMouseLeave={this.leaveBtn}
                  >
                    Search
                  </Button>
                </FormGroup>
              </Form>
              <div>
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
            </div>
            <div className="col-md-6 mb-1">
              <FetchBooks token={this.props.token} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchIndex;
