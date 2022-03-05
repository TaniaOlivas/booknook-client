import { Component } from 'react';
import SearchGenre from './SearchGenre';
import SearchTitle from './SearchTitle';
interface SearchIndexProps {
  token: string;
}

interface SearchIndexState {
  posts: [];
}

class SearchIndex extends Component<SearchIndexProps, SearchIndexState> {
  constructor(props: SearchIndexProps) {
    super(props);
    this.state = { posts: [] };
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Hello From SearchIndex</h1>
        <SearchTitle token={this.props.token} />
        <SearchGenre token={this.props.token} />
      </div>
    );
  }
}

export default SearchIndex;
