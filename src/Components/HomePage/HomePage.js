import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            {/* <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h4" color="inherit">
              <b>DP-View</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
