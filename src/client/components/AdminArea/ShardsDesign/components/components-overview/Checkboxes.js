import React from "react";
import { Col, Form } from "react-bootstrap";

const Checkboxes = () => (
  <Col sm={12} md={4} className="mb-3">
    <strong className="text-muted d-block mb-2">Checkboxes</strong>
    <fieldset>
      <Form.Check type="checkbox" label="Default" />
      <Form.Check type="checkbox" label="Checked" defaultChecked />
      <Form.Check type="checkbox" label="Disabled" disabled />
      <Form.Check type="checkbox" label="Disabled Checked" disabled defaultChecked />
    </fieldset>
  </Col>
);

export default Checkboxes;
