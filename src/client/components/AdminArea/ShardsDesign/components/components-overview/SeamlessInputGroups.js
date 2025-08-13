// @ts-nocheck

import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const SeamlessInputGroups = () => (
  <div>
    <InputGroup className="mb-3">
      <InputGroup.Text className="bg-transparent border-0">
        <i className="material-icons">person</i>
      </InputGroup.Text>
      <FormControl
        className="bg-transparent border-0"
        value="design.revision"
        onChange={() => {}}
      />
    </InputGroup>

    <InputGroup className="mb-3">
      <FormControl
        type="password"
        className="bg-transparent border-0"
        value="mySuperSecretPassword"
        onChange={() => {}}
      />
      <InputGroup.Text className="bg-transparent border-0">
        <i className="material-icons">lock</i>
      </InputGroup.Text>
    </InputGroup>

    <InputGroup className="mb-3">
      <FormControl className="bg-transparent border-0" placeholder="Recipient's username" />
      <Button variant="light">Button</Button>
    </InputGroup>
  </div>
);

export default SeamlessInputGroups;
