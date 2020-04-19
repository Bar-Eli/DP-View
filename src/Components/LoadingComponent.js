import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import MachineButton from "./MachineButtonComponent";
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
  ul: {
    listStyleType: "none",
  },
});

class CircularIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterNodesHostName: this.props.clusterNodesHostName,
      loading: false,
      success: false,
      buttonClass: "",
      clusterSize: 3,
      loaded: false,
    };
  }

  componentDidMount() {
    // Create an array of the cluster status
    let clusterNodesHostName = this.state.clusterNodesHostName;
    for (let index = 0; index < clusterNodesHostName.length; index++) {
      let obj = {};
      let hostname = clusterNodesHostName[index];
      obj["status"] = false;
      obj["message"] = "";
      this.setState({ [hostname]: obj });
    }
  }

  handleButtonClick = () => {
    const { classes } = this.props;
    this.setState({
      loading: true,
    });
    for (
      let index = 0;
      index < this.state.clusterNodesHostName.length;
      index++
    ) {
      this.createMPGWForEachMachine(this.state.clusterNodesHostName[index]);
    }
    //  // Create new MPGW and get the status response of the cluster
    //   const clusterResponseStatus = await this.props.createMPGW();
    //   // Set the current state of the cluster
    //   this.setState({
    //     loading: false,
    //     loaded: true,
    //     success: true,
    //     buttonClass: classes.buttonSuccess,
    //     clusterResponseStatus
    //   });
  };

  createMPGWForEachMachine = (ipOfMachine) => {
    const responseStatusObject = {};
    responseStatusObject[ipOfMachine] = { status: true, message: "Ok" };
    // const responseStatusObject = await this.props.createMPGW(ipOfMachine);
    this.setState({ [ipOfMachine]: responseStatusObject[ipOfMachine] });
    // this.setState({clusterResponseStatus});
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
                {(typeof this.state[item] !== 'undefined') ? (
                  <MachineButton
                    style={this.props.style}
                    loading={
                      this.state.loading && this.state[item]["message"] === ""
                    }
                    success={this.state[item]["status"]}
                    hostname={item}
                    loaded={this.state.loaded}
                  />
                ) : (
                  console.log()
                )}
                {this.state.loaded && !this.state[item]["status"] ? (
                  <Alert severity="error">{this.state[item]["message"]}</Alert>
                ) : (
                  console.log()
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(CircularIntegration);
