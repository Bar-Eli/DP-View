import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";

export default class Navbar extends Component {
  NavbarStyle = styled.div`
    #text {
      font-weight: bold;
      font-size: 350%;
    }
  `;

  render() {
    return (
      <this.NavbarStyle>
        <AppBar position="static">
          <Toolbar variant="dense">
            {/* <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography color="inherit" id="text">
              DP-View
            </Typography>
          </Toolbar>
        </AppBar>
      </this.NavbarStyle>
    );
  }
}
