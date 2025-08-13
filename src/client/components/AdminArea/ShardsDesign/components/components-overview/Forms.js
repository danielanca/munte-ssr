import React from "react";
import { Row, Col, Form, FormControl, FormGroup, InputGroup, FormSelect } from "react-bootstrap";

const Forms = () => (
  <Col sm={12} md={6}>
    <strong className="text-muted d-block mb-2">Forms</strong>
    <Form>
      <FormGroup className="mb-3">
        <InputGroup>
          <InputGroup.Text>@</InputGroup.Text>
          <FormControl placeholder="Username" />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <FormControl
          type="password"
          placeholder="Password"
          value="myCoolPassword"
          onChange={() => {}}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <FormControl
          placeholder="1234 Main St"
          value="7898 Kensington Junction, New York, USA"
          onChange={() => {}}
        />
      </FormGroup>
      <Row className="mb-3">
        <Col md={7}>
          <FormControl value="New York" onChange={() => {}} />
        </Col>
        <Col md={5}>
          <FormSelect>
            <option>Choose ...</option>
            <option>...</option>
          </FormSelect>
        </Col>
      </Row>
    </Form>
  </Col>
);

export default Forms;
