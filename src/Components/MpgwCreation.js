import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DataPowerMachineButton from "./DataPowerMachineButton";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  ul: {
    listStyleType: "none",
  },
});

class MpgwCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterNodesHostName: this.props.clusterNodesHostName,
      create: false,
      disable: false,
    };
  }

  handleButtonClick = () => {
    this.setState({ create: true , disable: true });
  };

  handleCreate = () => {
    this.setState({ create: false});
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
            disabled={this.state.disable}
            onClick={this.handleButtonClick}
          >
            Create
          </Button>
        </div>
        <div>
          <ul className={classes.ul}>
            {this.props.clusterNodesHostName.map((item) => (
              <li key={item} value={item}>
                <DataPowerMachineButton
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

export default withStyles(useStyles, { withTheme: true })(MpgwCreation);