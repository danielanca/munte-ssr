// @ts-nocheck

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col
} from "react-bootstrap";

/** @type {React.FC<{ title?: string, discussions?: any[] }>} */
const Discussions = ({ title, discussions }) => (
  <Card className="blog-comments mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      {discussions.map((discussion, idx) => (
        <div key={idx} className="blog-comments__item d-flex p-3 border-bottom">
          {/* Avatar */}
          <div className="blog-comments__avatar mr-3">
            <img
              src={discussion.author.image}
              alt={discussion.author.name}
              width={50}
              height={50}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          {/* Content */}
          <div className="blog-comments__content px-3 flex-grow-1">
            <div className="blog-comments__meta text-muted mb-1">
              <a className="text-secondary" href={discussion.author.url}>
                {discussion.author.name}
              </a>
              {" on "}
              <a className="text-secondary" href={discussion.post.url}>
                {discussion.post.title}
              </a>
              <span className="text-muted"> - {discussion.date}</span>
            </div>
            <p className="m-0 my-1 mb-2 text-muted">{discussion.body}</p>
            <div className="blog-comments__actions">
              <ButtonGroup size="sm">
                <Button variant="outline-success">
                  <i className="material-icons align-middle">check</i> Approve
                </Button>
                <Button variant="outline-danger">
                  <i className="material-icons align-middle">clear</i> Reject
                </Button>
                <Button variant="outline-secondary">
                  <i className="material-icons align-middle">more_vert</i> Edit
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      ))}
    </CardBody>
    <CardFooter className="border-top">
      <Row>
        <Col className="text-center">
          <Button variant="outline-primary" type="button">
            View All Comments
          </Button>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

Discussions.propTypes = {
  title: PropTypes.string,
  discussions: PropTypes.array
};

Discussions.defaultProps = {
  title: "Reviews",
  discussions: [
    {
      id: 1,
      date: "3 days ago",
      author: {
        image: require("../../images/avatars/1.jpg").default,
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "Well, the way they make shows is, they make one show ..."
    },
    {
      id: 2,
      date: "4 days ago",
      author: {
        image: require("../../images/avatars/2.jpg").default,
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "After the avalanche, it took us a week to climb out. Now..."
    },
    {
      id: 3,
      date: "5 days ago",
      author: {
        image: require("../../images/avatars/3.jpg").default,
        name: "John Doe",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "My money's in that office, right? If she start giving me..."
    }
  ]
};

export default Discussions;
