// @ts-nocheck

import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

const CustomFileUpload = () => {
  const [fileName, setFileName] = useState("Choose file...");
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || "Choose file...");
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="customFile2" style={{ cursor: "pointer" }}>
        {fileName}
      </Form.Label>
      <Form.Control
        type="file"
        id="customFile2"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
      />
      <Button
        variant="outline-secondary"
        onClick={() => inputRef.current && inputRef.current.click()}
        size="sm"
      >
        Browse
      </Button>
    </Form.Group>
  );
};

export default CustomFileUpload;
