import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default () => (
  <Box
    component="form"
    className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none"
    sx={{
      display: "flex",
      minHeight: "45px",
      width: "100%",
      px: 1,
    }}
  >
    <TextField
      fullWidth
      placeholder="Search for something..."
      variant="outlined"
      size="small"
      className="navbar-search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);
