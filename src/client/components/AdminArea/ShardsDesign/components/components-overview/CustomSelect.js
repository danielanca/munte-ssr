import React from "react";
import { InputGroup, Form, FormSelect } from "react-bootstrap";

const CustomSelect = () => (
  <div>
    {/* Prepend example */}
    <InputGroup className="mb-3">
      <InputGroup.Text id="prepend-options">Options</InputGroup.Text>
      <FormSelect aria-label="Options select" aria-describedby="prepend-options">
        <option>Choose</option>
        <option>...</option>
      </FormSelect>
    </InputGroup>

    {/* Append example */}
    <InputGroup className="mb-3">
      <FormSelect aria-label="Options select">
        <option>Choose</option>
        <option>...</option>
      </FormSelect>
      <InputGroup.Text id="append-options">Options</InputGroup.Text>
    </InputGroup>
  </div>
);

export default CustomSelect;
