/** @type {import("react").FC<{ layout?: string; stickyTop?: boolean }>} */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "react-bootstrap";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
/**
 * @param {{ layout?: string, stickyTop?: boolean }} props
 */


const MainNavbar = ({ layout, stickyTop }) => {
  const classes = classNames("main-navbar", "bg-white", stickyTop && "sticky-top");

  return (
    <div className={classes}>
      <Container className="px-5 py-1">
        <Navbar bg="light" expand="md" className="align-items-stretch flex-md-nowrap p-0">
          <NavbarSearch />
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
