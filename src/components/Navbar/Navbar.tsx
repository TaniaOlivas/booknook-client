import * as React from 'react';
import { Component } from 'react';

interface NavbarProps {}

interface NavbarState {}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  // constructor(props: NavbarProps) {
  //     super(props);
  //     this.state = { :  };
  // }
  render() {
    return (
      <div>
        <h1>Hello From Navbar</h1>
      </div>
    );
  }
}

export default Navbar;
