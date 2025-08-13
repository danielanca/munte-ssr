import React from "react";
import { Col, Form, FormCheck } from "react-bootstrap";

const RadioButtons = () => (
  <Col sm={12} md={4} className="mb-3">
    <strong className="text-muted d-block mb-2">Radio Buttons</strong>
    <fieldset>
      <FormCheck
        type="radio"
        label="Default"
        name="radioGroup"
        id="radio-default"
      />
      <FormCheck
        type="radio"
        label="Checked"
        name="radioGroup"
        id="radio-checked"
        defaultChecked
      />
      <FormCheck
        type="radio"
        label="Disabled"
        name="radioGroup"
        id="radio-disabled"
        disabled
      />
      <FormCheck
        type="radio"
        label="Disabled Checked"
        name="radioGroup"
        id="radio-disabled-checked"
        disabled
        defaultChecked
      />
    </fieldset>
  </Col>
);

export default RadioButtons;
