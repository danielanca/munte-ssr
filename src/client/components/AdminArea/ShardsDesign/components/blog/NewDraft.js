// @ts-nocheck

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";

/** @type {React.FC<{ title?: string }>} */
const NewDraft = ({ title }) => (
  <Card className="h-100 mb-4">
    {/* Card Header */}
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="d-flex flex-column">
      <Form className="quick-post-form">
        {/* Title */}
        <FormGroup>
          <FormControl placeholder="Brave New World" />
        </FormGroup>
        {/* Body */}
        <FormGroup>
          <FormControl as="textarea" placeholder="Words can be like X-rays if you use them properly..." rows={4} />
        </FormGroup>
        {/* Create Draft */}
        <FormGroup className="mb-0">
          <Button variant="primary" type="submit">
            Create Draft
          </Button>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
);

NewDraft.propTypes = {
  title: PropTypes.string
};

NewDraft.defaultProps = {
  title: "New Draft"
};

export default NewDraft;
