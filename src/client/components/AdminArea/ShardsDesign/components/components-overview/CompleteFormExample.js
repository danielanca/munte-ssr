// @ts-nocheck

import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormCheck,
  FormSelect,
  Button
} from "react-bootstrap";

const CompleteFormExample = () => (
  <ListGroup variant="flush">
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Form.Label htmlFor="feEmailAddress">Email</Form.Label>
                  <FormControl
                    id="feEmailAddress"
                    type="email"
                    placeholder="Email"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Form.Label htmlFor="fePassword">Password</Form.Label>
                  <FormControl
                    id="fePassword"
                    type="password"
                    placeholder="Password"
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Form.Label htmlFor="feInputAddress">Address</Form.Label>
              <FormControl id="feInputAddress" placeholder="1234 Main St" />
            </FormGroup>

            <FormGroup>
              <Form.Label htmlFor="feInputAddress2">Address 2</Form.Label>
              <FormControl
                id="feInputAddress2"
                placeholder="Apartment, Studio or Floor"
              />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Form.Label htmlFor="feInputCity">City</Form.Label>
                  <FormControl id="feInputCity" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Form.Label htmlFor="feInputState">State</Form.Label>
                  <FormSelect id="feInputState">
                    <option>Choose...</option>
                    <option>...</option>
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Form.Label htmlFor="feInputZip">Zip</Form.Label>
                  <FormControl id="feInputZip" />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <FormCheck
                    type="checkbox"
                    id="privacyPolicy"
                    label={
                      <>
                        I agree with your <a href="#">Privacy Policy</a>.
                      </>
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit">Create New Account</Button>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
);

export default CompleteFormExample;
