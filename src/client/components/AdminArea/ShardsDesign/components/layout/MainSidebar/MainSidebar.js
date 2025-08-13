// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box, Grid } from "@mui/material";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";
import { Store } from "../../../flux";

class MainSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      sidebarNavItems: Store.getSidebarItems()
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
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems()
    });
  }

  render() {
    const { menuVisible } = this.state;
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      menuVisible && "open"
    );

    return (
      <Grid item lg={2} md={3} className={classes}>
        <Box component="aside">
          <SidebarMainNavbar hideLogoText={this.props.hideLogoText} />
          <SidebarSearch />
          <SidebarNavItems />
        </Box>
      </Grid>
    );
  }
}

MainSidebar.propTypes = {
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

export default MainSidebar;
