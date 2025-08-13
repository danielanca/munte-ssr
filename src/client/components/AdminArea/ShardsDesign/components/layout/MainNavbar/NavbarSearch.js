import React from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";

const NavbarSearch = () => (
  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    <InputGroup className="ml-3">
      <InputGroup.Text>
        <i className="material-icons">search</i>
      </InputGroup.Text>
      <FormControl
        className="navbar-search"
        placeholder="Search for something..."
      />
    </InputGroup>
  </Form>
);

export default NavbarSearch;
