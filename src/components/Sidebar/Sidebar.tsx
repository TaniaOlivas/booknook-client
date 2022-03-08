import { Component } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaHome, FaList, FaRegHeart } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { RiPencilLine } from 'react-icons/ri';
import { BiCog } from 'react-icons/bi';
import { GiAbstract050 } from 'react-icons/gi';
import { HiLogin } from 'react-icons/hi';
import 'react-pro-sidebar/dist/css/styles.css';
import ReviewFeed from '../Reviews/Feed/ReviewFeed';
import SearchIndex from '../Postings/SearchPost/SearchIndex';
import PostIndex from '../Postings/PostingIndex';
import ReviewIndex from '../Reviews/ReviewIndex';

interface SidebarProps {
  clearLocalStorage: () => void;
  token: string;
  user: string;
  userId: string | number;
}

interface SidebarState {
  menuCollapse: boolean;
}

class Sidebar extends Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = { menuCollapse: false };
  }

  menuIconClick = () => {
    this.state.menuCollapse
      ? this.setState({ menuCollapse: false })
      : this.setState({ menuCollapse: true });
  };
  render() {
    return (
      <>
        <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={this.state.menuCollapse}>
            <SidebarHeader>
              <div className="logotext" onClick={this.menuIconClick}>
                {/* Icon change using menucollapse state */}
                <div>
                  {this.state.menuCollapse ? (
                    <GiAbstract050 />
                  ) : (
                    <p>
                      BookNook <br />
                      <HiLogin className="icon" />
                    </p>
                  )}
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem icon={<FaHome />}>
                  <Link to="/feed">Feed</Link>
                </MenuItem>
                <MenuItem icon={<FaList />}>
                  <Link to="/review">Create Review</Link>
                </MenuItem>
                {this.props.user === 'Author' ? (
                  <MenuItem icon={<FaRegHeart />}>
                    <Link to="/posts">Create Post</Link>
                  </MenuItem>
                ) : (
                  <></>
                )}

                <MenuItem icon={<RiPencilLine />}>
                  <Link to="/search">Search</Link>
                </MenuItem>
                <MenuItem icon={<BiCog />}>Settings</MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem
                  icon={<FiLogOut />}
                  onClick={this.props.clearLocalStorage}
                >
                  Logout
                </MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
        <div style={{ textAlign: 'center', marginLeft: '20%' }}>
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
          </Routes>
        </div>
      </>
    );
  }
}

export default Sidebar;
