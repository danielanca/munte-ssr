import React from "react";
import { Row, Col, Form, FormGroup, FormControl, FormSelect, FormLabel } from "react-bootstrap";

const FormValidation = () => (
  <Col sm={12} md={6}>
    <strong className="text-muted d-block mb-2">Form Validation</strong>
    <Form>
      <Row>
        <Col md={6}>
          <FormGroup className="mb-3">
            <FormControl
              value="Vasile"
              placeholder="First name"
              required
              isValid={true}
              onChange={() => {}}
            />
            <FormControl.Feedback type="valid">
              The first name looks good!
            </FormControl.Feedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup className="mb-3">
            <FormControl
              value="Catalin"
              placeholder="Last name"
              required
              isValid={true}
              onChange={() => {}}
            />
            <FormControl.Feedback type="valid">
              The last name looks good!
            </FormControl.Feedback>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup className="mb-3">
        <FormControl
          placeholder="Username"
          required
          isInvalid={true}
        />
        <FormControl.Feedback type="invalid">
          The username is taken.
        </FormControl.Feedback>
      </FormGroup>
      <FormGroup className="mb-3">
        <FormSelect isInvalid>
          <option>Choose</option>
          <option>...</option>
        </FormSelect>
        <FormControl.Feedback type="invalid">
          Please select your state
        </FormControl.Feedback>
      </FormGroup>
    </Form>
  </Col>
);

export default FormValidation;
