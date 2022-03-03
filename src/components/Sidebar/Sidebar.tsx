import * as React from 'react';
import { Component } from 'react';
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

interface SidebarProps {
  clearLocalStorage: () => void;
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
                <p>
                  {this.state.menuCollapse ? (
                    <GiAbstract050 />
                  ) : (
                    <p>
                      BookNook <br />
                      <HiLogin className="icon" />
                    </p>
                  )}
                </p>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem active={true} icon={<FaHome />}>
                  Home
                </MenuItem>
                <MenuItem icon={<FaList />}>Category</MenuItem>
                <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
                <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
                <MenuItem icon={<BiCog />}>Settings</MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </>
    );
  }
}

export default Sidebar;
