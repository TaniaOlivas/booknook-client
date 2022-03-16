import * as React from 'react';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { ImBooks } from 'react-icons/im';
import { BiBookAdd, BiCommentAdd, BiSearchAlt } from 'react-icons/bi';
import { BsViewList } from 'react-icons/bs';

import 'react-pro-sidebar/dist/css/styles.css';
import ReviewFeed from '../Reviews/Feed/ReviewFeed';
import SearchIndex from '../BookList/SearchPosts/SearchIndex';
import PostIndex from '../Postings/PostingIndex';
import ReviewIndex from '../Reviews/ReviewIndex';
import BooksIndex from '../BookList/BooksIndex';

interface NavigationProps {
  clearLocalStorage: () => void;
  token: string;
  user: string;
  userId: string | number;
}

interface NavigationState {
  menuCollapse: boolean;
}

class Navigation extends Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = { menuCollapse: false };
  }

  menuIconClick = () => {
    this.state.menuCollapse
      ? this.setState({ menuCollapse: false })
      : this.setState({ menuCollapse: true });
  };
  enterBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.currentTarget.style.background = '#f5f1e5';
    e.currentTarget.style.color = '#181d31';
  };
  leaveBtn = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.currentTarget.style.background = '#181d31';
    e.currentTarget.style.color = '#f5f1e5';
  };

  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: '#f5f1e5',
            position: 'fixed',
            top: '0',
            width: '100%',
            overflow: 'hidden',
            zIndex: '1030',
          }}
        >
          <Navbar>
            <NavbarBrand style={{ color: '#181d31' }}>
              <h2>BookNook</h2>
            </NavbarBrand>
            <Nav>
              <Button
                onClick={this.props.clearLocalStorage}
                style={{ backgroundColor: '#181d31', color: '#eeebe2' }}
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                Logout
              </Button>
            </Nav>
          </Navbar>
        </div>
        <div
          style={{
            backgroundColor: '#181D31',
            position: 'fixed',
            bottom: '0',
            width: '100%',
            overflow: 'hidden',
            height: '50px',
            zIndex: '1030',
          }}
        >
          <Nav justified pills>
            <NavItem>
              <NavLink
                href="/feed"
                style={{
                  height: '50px',
                  color: '#f5f1e5',
                }}
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                <BsViewList style={{ height: '100%' }} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/review"
                style={{
                  border: '1px solid #181D31',
                  height: '50px',
                  color: '#f5f1e5',
                }}
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                <BiCommentAdd style={{ height: '100%' }} />
              </NavLink>
            </NavItem>
            {this.props.user === 'Author' ? (
              <NavItem>
                <NavLink
                  href="/posts"
                  style={{
                    border: '1px solid #181D31',
                    height: '50px',
                    color: '#f5f1e5',
                  }}
                  onMouseEnter={this.enterBtn}
                  onMouseLeave={this.leaveBtn}
                >
                  <BiBookAdd style={{ height: '100%' }} />
                </NavLink>
              </NavItem>
            ) : (
              <></>
            )}
            <NavItem>
              <NavLink
                href="/search"
                style={{
                  border: '1px solid #181D31',
                  height: '50px',
                  color: '#f5f1e5',
                }}
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                <BiSearchAlt style={{ height: '100%' }} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/books"
                style={{
                  border: '1px solid #181D31',
                  height: '50px',
                  color: '#f5f1e5',
                }}
                onMouseEnter={this.enterBtn}
                onMouseLeave={this.leaveBtn}
              >
                <ImBooks
                  style={{
                    height: '100%',
                  }}
                />
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div>
          <Routes>
            <Route
              path="/feed"
              element={
                <ReviewFeed
                  userId={this.props.userId}
                  token={this.props.token}
                />
              }
            ></Route>
            <Route
              path="/review"
              element={<ReviewIndex token={this.props.token} />}
            ></Route>
            <Route
              path="/posts"
              element={<PostIndex token={this.props.token} />}
            ></Route>
            <Route
              path="/search"
              element={<SearchIndex token={this.props.token} />}
            ></Route>
            <Route
              path="/books"
              element={<BooksIndex token={this.props.token} />}
            ></Route>
          </Routes>
        </div>
      </>
    );
  }
}

export default Navigation;
