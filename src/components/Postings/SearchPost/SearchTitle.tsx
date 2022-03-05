import { Component } from 'react';
import { Button } from 'reactstrap';

interface SearchTitleProps {
  token: string;
}

interface SearchTitleState {
  searchTitles: title[];
  searchItem: string;
}

interface title {
  title: string;
}

class SearchTitle extends Component<SearchTitleProps, SearchTitleState> {
  constructor(props: SearchTitleProps) {
    super(props);
    this.state = { searchTitles: [], searchItem: '' };
  }
  fetchTitle = () => {
    fetch(`http://localhost:4000/post/title/${this.state.searchItem}`, {
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
          searchTitles: data,
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  componentDidMount() {
    this.fetchTitle();
  }

  render() {
    return (
      <div>
        <h1>Hello From SearchTitle</h1>
        <Button onClick={this.fetchTitle}>Click To Fetch</Button>
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

export default SearchTitle;
