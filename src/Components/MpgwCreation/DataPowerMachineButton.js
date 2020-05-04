import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CreateIcon from "@material-ui/icons/Create";
import ErrorIcon from "@material-ui/icons/Error";
import Alert from "@material-ui/lab/Alert";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonFailed: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class DataPowerMachineButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostname: this.props.hostname,
      loading: false,
      status: false,
      message: "",
      done: false,
    };
  }

  createMPGW = async () => {
    this.setState({ loading: true });
    let response = await this.props.createMpgw(this.state.hostname);
    this.checkStatus(response)
  };

  checkStatus = (response) => {
    const { classes } = this.props;
    if (response["status"] === true)
      this.setState({
        status: true,
        buttonClass: classes.buttonSuccess,
        done: true,
        loading: false,
        message: response["message"],
      });
    else
      this.setState({
        status: false,
        buttonClass: classes.buttonFailed,
        done: true,
        loading: false,
        message: response["message"],
      });
  };

  render() {
    const { classes } = this.props;
    if (this.props.create) {
      this.createMPGW();
      this.props.handleCreate();

    }
    return (
      <div className={classes.root}>
        <p style={this.props.style}>{this.state.hostname}</p>
        <div className={classes.wrapper}>
          <Fab
            aria-label="create route"
            color="primary"
            style={this.props.style}
            className={this.state.buttonClass}
          >
            {this.state.status ? (
              <CheckIcon />
            ) : this.state.done ? (
              <ErrorIcon fontSize="large" />
            ) : (
              <CreateIcon fontSize="large" />
            )}
          </Fab>
          {this.state.loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </div>
        {this.state.done && !this.state.status ? (
          <Alert severity="error">{this.state.message}</Alert>
        ) : (
          console.log()
        )}
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(DataPowerMachineButton);