import { Component } from 'react';
import { Button } from 'reactstrap';

interface SearchGenreProps {
  token: string;
}

interface SearchGenreState {
  searchGenres: title[];
  searchItem: string;
}

interface title {
  title: string;
}

class SearchGenre extends Component<SearchGenreProps, SearchGenreState> {
  constructor(props: SearchGenreProps) {
    super(props);
    this.state = { searchGenres: [], searchItem: '' };
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
      .then((data) => {
        console.log(data);
        this.setState({
          searchGenres: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  componentDidMount() {
    this.fetchGenre();
  }

  render() {
    return (
      <div>
        <h1>Hello From SearchGenre</h1>
        <Button onClick={this.fetchGenre}>Click To Fetch</Button>
        <input
          type="text"
          placeholder="Search"
          value={this.state.searchItem}
          onChange={(e) => this.setState({ searchItem: e.target.value })}
        />
      </div>
    );
  }
}

export default SearchGenre;
