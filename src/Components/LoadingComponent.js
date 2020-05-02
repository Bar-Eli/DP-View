import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import MachineButton from "./MachineButtonComponent";

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
  ul: {
    listStyleType: "none",
  },
});

class CircularIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterNodesHostName: this.props.clusterNodesHostName,
      create: false,
      loading: false,
      success: false,
      buttonClass: "",
      creationFinished: 0,
    };
  }

  handleButtonClick = () => {
    this.setState({
      loading: true,
      create: true,
    });
  };

  handleCreate = () => {
    const { classes } = this.props;
    this.setState({
      create: false,
      loading: false,
      success: true,
      buttonClass: classes.buttonSuccess,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            style={this.props.style}
            className={this.state.buttonClass}
            disabled={this.state.success}
            onClick={this.handleButtonClick}
          >
            Create
          </Button>
          {this.state.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        <div>
          <ul className={classes.ul}>
            {this.props.clusterNodesHostName.map((item) => (
              <li key={item} value={item}>
                <MachineButton
                  style={this.props.style}
                  hostname={item}
                  createMpgw={this.props.createMPGW}
                  create={this.state.create}
                  handleCreate={this.handleCreate}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(CircularIntegration);
