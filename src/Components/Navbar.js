import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFootballBall } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

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
    #option{
        text-decoration: none;
        margin-right: 2rem;
    }
    .btn {
      color: white;
      margin-right: 100px;
      font-weight: bold;
      font-size: 100%;
    }
    #logo {
      margin-right: 15px;
    }
  `;

  render() {
    return (
      <this.NavbarStyle>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography color="inherit" id="text">
              <FontAwesomeIcon icon={faFootballBall} id="logo" />
              NFL
            </Typography>
            <Typography color="inherit" id="option" variant="h6" component={Link} to="/new">New MPGW</Typography>
            <Typography color="inherit" id="option" variant="h6" component={Link} to="/test">Edit MPGW</Typography>
          </Toolbar>
        </AppBar>
      </this.NavbarStyle>
    );
  }
}

export default withRouter(Navbar);
