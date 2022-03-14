import * as React from 'react';
import { Component } from 'react';
interface BooksIndexProps {
  token: string;
}

interface BooksIndexState {}

class BooksIndex extends Component<BooksIndexProps, BooksIndexState> {
  // constructor(props: BooksIndexProps) {
  //     super(props);
  //     this.state = { :  };
  // }
  render() {
    return (
      <div>
        <h1>Hello From BooksIndex</h1>
        <h3>Books To Read</h3>
      </div>
    );
  }
}

export default BooksIndex;
