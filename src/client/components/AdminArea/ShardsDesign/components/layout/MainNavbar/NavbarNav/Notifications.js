// @ts-nocheck
import React, { useState } from "react";
import { Nav, Badge, Dropdown } from "react-bootstrap";

const Notifications = () => {
  const [show, setShow] = useState(false);

  return (
    <Nav.Item className="border-right dropdown notifications">
      <Dropdown show={show} onToggle={() => setShow(!show)}>
        <Dropdown.Toggle
          as={Nav.Link}
          className="nav-link-icon text-center"
          id="notifications-dropdown"
          onClick={() => setShow((s) => !s)}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill bg="danger" className="ms-1">
              2
            </Badge>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" className="dropdown-menu-small show">
          <Dropdown.Item as="div">
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Analytics</span>
              <p>
                Your website’s active users count increased by{" "}
                <span className="text-success text-semibold">28%</span> in the
                last week. Great job!
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item as="div">
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE8D1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Sales</span>
              <p>
                Last week your store’s sales count decreased by{" "}
                <span className="text-danger text-semibold">5.52%</span>. It
                could have been worse!
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="notification__all text-center">
            View all Notifications
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default Notifications;
