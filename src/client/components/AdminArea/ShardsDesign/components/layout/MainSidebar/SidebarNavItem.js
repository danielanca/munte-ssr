import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { ListItemButton, ListItemText } from "@mui/material";

/**
 * @param {{ item: { to: string, title?: string, htmlBefore?: string, htmlAfter?: string } }} param0
 */
const SidebarNavItem = ({ item }) => (
  <li className="nav-item">
    <ListItemButton
      component={RouteNavLink}
      to={item.to}
      className="nav-link d-flex"
    >
      {item.htmlBefore && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
        />
      )}
      {item.title && <ListItemText primary={item.title} />}
      {item.htmlAfter && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
        />
      )}
    </ListItemButton>
  </li>
);

SidebarNavItem.propTypes = {
  item: PropTypes.shape({
    to: PropTypes.string.isRequired,
    title: PropTypes.string,
    htmlBefore: PropTypes.string,
    htmlAfter: PropTypes.string
  }).isRequired
};

export default SidebarNavItem;
