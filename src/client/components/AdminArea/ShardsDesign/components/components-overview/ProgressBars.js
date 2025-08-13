import React from "react";
import { ListGroupItem, ProgressBar } from "react-bootstrap";

const ProgressBars = () => (
  <ListGroupItem className="px-3">
    <div className="mb-2">
      <strong className="text-muted d-block mb-3">Progress Bars</strong>
      <ProgressBar style={{ height: "5px" }} now={50} className="mb-3" />
      <ProgressBar
        variant="success"
        style={{ height: "5px" }}
        className="mb-3"
        now={40}
      />
      <ProgressBar
        variant="info"
        style={{ height: "5px" }}
        className="mb-3"
        now={60}
      />
      <ProgressBar
        variant="danger"
        style={{ height: "5px" }}
        className="mb-3"
        now={80}
      />
    </div>
  </ListGroupItem>
);

export default ProgressBars;
