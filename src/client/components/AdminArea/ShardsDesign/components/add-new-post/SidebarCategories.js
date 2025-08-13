// @ts-nocheck

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  FormCheck,
  FormControl
} from "react-bootstrap";

/** @type {React.FC<{ title?: string }>} */
const SidebarCategories = ({ title }) => (
  <Card className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup variant="flush">
        <ListGroupItem className="px-3 pb-2">
          <FormCheck className="mb-1" value="uncategorized" defaultChecked label="Uncategorized" />
          <FormCheck className="mb-1" value="design" defaultChecked label="Design" />
          <FormCheck className="mb-1" value="development" label="Development" />
          <FormCheck className="mb-1" value="writing" label="Writing" />
          <FormCheck className="mb-1" value="books" label="Books" />
        </ListGroupItem>

        <ListGroupItem className="d-flex px-3">
          <InputGroup>
            <FormControl placeholder="New category" />
            <Button variant="outline-secondary" className="px-2">
              <i className="material-icons">add</i>
            </Button>
          </InputGroup>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

SidebarCategories.propTypes = {
  title: PropTypes.string
};

SidebarCategories.defaultProps = {
  title: "Categories"
};

export default SidebarCategories;
