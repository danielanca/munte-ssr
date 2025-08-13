import React from "react";
import { List } from "@mui/material";
import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      navItems: Store.getSidebarItems()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;

    return (
      <div className="nav-wrapper">
        <List className="nav--no-borders flex-column" disablePadding>
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </List>
      </div>
    );
  }
}

export default SidebarNavItems;
