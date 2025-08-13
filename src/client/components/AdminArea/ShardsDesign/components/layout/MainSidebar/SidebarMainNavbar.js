// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";

import { Dispatcher, Constants } from "../../../flux";

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({ actionType: Constants.TOGGLE_SIDEBAR });
  }

  render() {
    const { hideLogoText } = this.props;

    return (
      <div className="main-navbar">
        <AppBar
          position="static"
          color="default"
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          elevation={0}
        >
          <Toolbar
            variant="dense"
            disableGutters
            className="w-100 mr-0"
            style={{ minHeight: 48, lineHeight: "25px" }}
          >
            <Box
              component="a"
              href="#"
              className="d-table m-auto"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                id="main-logo"
                className="d-inline-block align-top mx-2"
                style={{ maxWidth: 25 }}
                src={
                  require("../../../images/shards-dashboards-logo.svg").default
                }
                alt="Shards Dashboard"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">
                  MontanAir.Ro Panel
                </span>
              )}
            </Box>

            <IconButton
              edge="end"
              onClick={this.handleToggleSidebar}
              className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
              size="large"
            >
              <i className="material-icons">&#xE5C4;</i>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

export default SidebarMainNavbar;
