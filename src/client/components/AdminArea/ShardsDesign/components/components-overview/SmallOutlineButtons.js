// @ts-nocheck

import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const SmallOutlineButtons = () => (
  <Row>
    <Col>
      <Button variant="outline-primary" size="sm" className="mb-2 mx-1">
        Primary
      </Button>
      <Button variant="outline-secondary" size="sm" className="mb-2 mx-1">
        Secondary
      </Button>
      <Button variant="outline-success" size="sm" className="mb-2 mx-1">
        Success
      </Button>
      <Button variant="outline-danger" size="sm" className="mb-2 mx-1">
        Danger
      </Button>
      <Button variant="outline-warning" size="sm" className="mb-2 mx-1">
        Warning
      </Button>
      <Button variant="outline-info" size="sm" className="mb-2 mx-1">
        Info
      </Button>
      <Button variant="outline-dark" size="sm" className="mb-2 mx-1">
        Dark
      </Button>
      <Button variant="outline-light" size="sm" className="mb-2 mx-1">
        Light
      </Button>
    </Col>
  </Row>
);

export default SmallOutlineButtons;
