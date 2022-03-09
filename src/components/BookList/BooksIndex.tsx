import * as React from 'react';
import { Component } from 'react';
import { Table } from 'reactstrap';
interface BooksIndexProps {
  token: string;
}

interface BooksIndexState {}

class BooksIndex extends React.Component<BooksIndexProps, BooksIndexState> {
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
