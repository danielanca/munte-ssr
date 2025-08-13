import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const InputGroups = () => (
  <div>
    {/* Prepend Example */}
    <InputGroup className="mb-3">
      <InputGroup.Text>@</InputGroup.Text>
      <FormControl placeholder="Username" />
    </InputGroup>

    {/* Append Example */}
    <InputGroup className="mb-3">
      <FormControl value="catalin" onChange={() => {}} />
      <InputGroup.Text>@designrevision.com</InputGroup.Text>
    </InputGroup>

    {/* Prepend & Append Example */}
    <InputGroup className="mb-3">
      <InputGroup.Text>$</InputGroup.Text>
      <FormControl value="1000" onChange={() => {}} />
      <InputGroup.Text>.00</InputGroup.Text>
    </InputGroup>
  </div>
);

export default InputGroups;
