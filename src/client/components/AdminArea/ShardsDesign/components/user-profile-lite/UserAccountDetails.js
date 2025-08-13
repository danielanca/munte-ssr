// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect
} from "react-bootstrap";

/** @type {React.FC<{ title?: string }>} */
const UserAccountDetails = ({ title }) => (
  <Card className="mb-4">
    <CardHeader>
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup variant="flush">
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>First Name</FormLabel>
                    <FormControl placeholder="First Name" defaultValue="Sierra" />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl placeholder="Last Name" defaultValue="Brooks" />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      type="email"
                      placeholder="Email Address"
                      defaultValue="sierra@example.com"
                      autoComplete="email"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                      type="password"
                      placeholder="Password"
                      defaultValue="EX@MPL#P@$$w0RD"
                      autoComplete="current-password"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <FormLabel>Address</FormLabel>
                <FormControl placeholder="Address" defaultValue="1234 Main St." />
              </FormGroup>

              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>City</FormLabel>
                    <FormControl placeholder="City" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <FormLabel>State</FormLabel>
                    <FormSelect>
                      <option>Choose...</option>
                      <option>...</option>
                    </FormSelect>
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <FormLabel>Zip</FormLabel>
                    <FormControl placeholder="Zip" />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormControl as="textarea" rows={5} />
              </FormGroup>

              <Button variant="primary" type="submit">Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserAccountDetails.propTypes = {
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
