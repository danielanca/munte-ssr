// @ts-nocheck

import React from "react";
import { Col, Form, FormCheck } from "react-bootstrap";

const ToggleButtons = () => (
  <Col sm={12} md={4} className="mb-3">
    <strong className="text-muted d-block mb-2">Toggle Switches</strong>
    <fieldset>
      <FormCheck 
        type="switch" 
        id="toggle-default" 
        label="Default" 
        size="sm" 
      />
      <FormCheck 
        type="switch" 
        id="toggle-checked" 
        label="Checked" 
        size="sm" 
        defaultChecked 
      />
      <FormCheck 
        type="switch" 
        id="toggle-disabled" 
        label="Disabled" 
        size="sm" 
        disabled 
      />
      <FormCheck 
        type="switch" 
        id="toggle-disabled-checked" 
        label="Disabled Checked" 
        size="sm" 
        defaultChecked 
        disabled 
      />
    </fieldset>
  </Col>
);

export default ToggleButtons;
