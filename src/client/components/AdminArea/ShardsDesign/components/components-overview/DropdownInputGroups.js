import React, { useState } from "react";
import { InputGroup, Form, Dropdown, DropdownButton } from "react-bootstrap";

const DropdownInputGroups = () => {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  return (
    <div>
      {/* Append Dropdown */}
      <InputGroup className="mb-3">
        <Form.Control />
        <Dropdown
          show={dropdown1}
          onToggle={() => setDropdown1((prev) => !prev)}
          align="end"
        >
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-append">
            Dropdown
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup>

      {/* Prepend Dropdown */}
      <InputGroup className="mb-3">
        <Dropdown
          show={dropdown2}
          onToggle={() => setDropdown2((prev) => !prev)}
        >
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-prepend">
            Dropdown
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else here</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control />
      </InputGroup>
    </div>
  );
};

export default DropdownInputGroups;
