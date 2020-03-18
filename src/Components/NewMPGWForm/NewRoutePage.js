import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import RouteStepper from "./RouteStepper/RouteStepper";
import Navbar from "../Navbar";

const useStyles = theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  stylish: {
    background: "linear-gradient(45deg, #29323c 30%, #485563 90%)",
    // background: 'linear-gradient(45deg, #434343   30%, #000000 90%)',
    // background: 'linear-gradient(45deg, #6e1a5d 30%, #21CBF3 90%)',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // background: 'linear-gradient(45deg, #2196F3  30%, #21CBF3  90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    // height: 48,
    padding: "0 30px",
    textTransform: "none"
  }
});

class NewRoutePage extends Component {
  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    const { classes } = this.props; // how to assign UseStyleS
    return (
      <div className={classes.root}>
        <Navbar />
        <br />
        <Button
          variant="contained"
          className={classes.stylish}
          onClick={this.refreshPage}
        >
          <Typography variant="h3" component="h2">
            New MPGW
          </Typography>
        </Button>

        <RouteStepper />

        <br />
        {/*<Button variant="contained">Default</Button>*/}
        {/*<Button variant="contained" color="primary">Primary</Button>*/}
        {/*<Button variant="contained" color="secondary">Secondary</Button>*/}
        {/*<Button className={classes.stylish} variant="contained" color="secondary">Stylish</Button>*/}
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(NewRoutePage);
