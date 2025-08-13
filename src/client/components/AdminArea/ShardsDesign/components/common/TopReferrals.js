// @ts-nocheck

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form
} from "react-bootstrap";

const TopReferrals = ({ title, referralData }) => (
  <Card>
    <Card.Header className="border-bottom d-flex align-items-center justify-content-between">
      <h6 className="mb-0">{title}</h6>
      <div className="block-handle" />
    </Card.Header>

    <Card.Body className="p-0">
      <ListGroup variant="flush" className="list-group-small">
        {referralData.map((item, idx) => (
          <ListGroupItem key={idx} className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">{item.title}</span>
            <span className="ms-auto text-end text-semibold text-reagent-gray">
              {item.value}
            </span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card.Body>

    <Card.Footer className="border-top">
      <Row>
        {/* Time Span */}
        <Col>
          <Form.Select
            size="sm"
            value="last-week"
            style={{ maxWidth: "130px" }}
            onChange={() => {}}
          >
            <option value="last-week">Last Week</option>
            <option value="today">Today</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </Form.Select>
        </Col>

        {/* View Full Report */}
        <Col className="text-end view-report">
          {/* eslint-disable-next-line */}
          <a href="#">Full report &rarr;</a>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

TopReferrals.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array
};

TopReferrals.defaultProps = {
  title: "Top Referrals",
  referralData: [
    {
      title: "GitHub",
      value: "19,291"
    },
    {
      title: "Stack Overflow",
      value: "11,201"
    },
    {
      title: "Hacker News",
      value: "9,291"
    },
    {
      title: "Reddit",
      value: "8,281"
    },
    {
      title: "The Next Web",
      value: "7,128"
    },
    {
      title: "Tech Crunch",
      value: "6,218"
    },
    {
      title: "YouTube",
      value: "1,218"
    },
    {
      title: "Adobe",
      value: "1,171"
    }
  ]
};

export default TopReferrals;
