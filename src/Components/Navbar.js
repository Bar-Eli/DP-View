import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false
    };
  }

  NavbarStyle = styled.div`
    #text {
      font-weight: bold;
      font-size: 300%;
      margin-right: 75px;
    }
    .btn {
      color: white;
      margin-right: 100px;
      font-weight: bold;
      font-size: 100%;
    }
  `;

  handleRedirect = num => {
    if (num === 1) {
      this.props.history.push("/");
    }
    if (num === 2) {
      this.props.history.push("/addRule");
    }
    if (num === 3) {
      this.props.history.push("/editRule");
    }
  };

  render() {
    return (
      <this.NavbarStyle>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography color="inherit" id="text">
              DP View
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => this.handleRedirect(1)}
              className="btn"
            >
              Add New MPGW
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => this.handleRedirect(2)}
              className="btn"
            >
              Add New Rule
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => this.handleRedirect(3)}
              className="btn"
            >
              Edit Existing Rule
            </Link>
          </Toolbar>
        </AppBar>
      </this.NavbarStyle>
    );
  }
}

export default withRouter(Navbar);
