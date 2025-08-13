import React from "react";
import ReactQuill from "react-quill";
import { Card, Form, FormControl } from "react-bootstrap";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = () => (
  <Card className="mb-3">
    <Card.Body>
      <Form className="add-new-post">
        <FormControl
          size="lg"
          className="mb-3 text-muted fw-bold"
          placeholder="Your Post Title"
        />
        <ReactQuill className="add-new-post__editor mb-1" />
      </Form>
    </Card.Body>
  </Card>
);

export default Editor;
