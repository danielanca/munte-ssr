import React from "react";
import { Nav } from "react-bootstrap";
import Notifications from "./Notifications";
import UserActions from "./UserActions";

/** @returns {JSX.Element} */
const NavbarNav = () => (
  <Nav className="border-left flex-row">
    <Notifications />
    <UserActions />
  </Nav>
);

export default NavbarNav;
