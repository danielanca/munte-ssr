// @ts-nocheck

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";

const UserActions = () => {
  const [show, setShow] = useState(false);
  const avatar = require("./../../../../images/avatars/0.jpg");

  return (
    <Nav.Item as={Dropdown} show={show} onToggle={() => setShow(!show)}>
      <Dropdown.Toggle
        as={Nav.Link}
        className="text-nowrap px-3"
        id="user-actions-dropdown"
        onClick={() => setShow((s) => !s)}
      >
        <img
          className="user-avatar rounded-circle mx-2"
          src={avatar}
          alt="User Avatar"
          style={{ width: 32, height: 32, objectFit: "cover" }}
        />
        <span
          role="button"
          className="d-none d-md-inline-block font-weight-bold"
        >
          Sierra Brooks
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item as={Link} to="/" className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Nav.Item>
  );
};

export default UserActions;
