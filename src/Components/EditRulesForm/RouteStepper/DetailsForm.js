import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SimpleReactValidator from "simple-react-validator";
import DpCredsPopup from "../../DpCredsPopup";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
});

class DetailsForm extends Component {
  constructor(props) {
    super(props);
    // add cluster as variable?
    this.state = {
      popUpStatus: false,
      showMpgw: "none",
      showRestOfForm: "block",
      testBtnColor:
        this.props.details.testOrProd === "test" ? "primary" : "default",
      prodBtnColor:
        this.props.details.testOrProd === "prod" ? "primary" : "default",
      mpgwList: [],
      environmentsList: ["ZadokCluster", "Salim", "Zeus"],
      // verify if form is complete somehow
    };

    this.validator = new SimpleReactValidator();
    this.validator.message(
      "cluster",
      this.props.details.clusterName,
      "required"
    );
    this.validator.message("mpgw", this.props.details.mpgwName, "required");

    this.checkIfAllValid();
  }

  handlePopUpClose = () => {
    this.setState({ popUpStatus: false });
  };

  handleCreds = () => {
    // Handle a press on the finish button
    this.setState({ popUpStatus: true });
  };

  handleCredsFinish = () => {
    this.setMpgwArray(
      this.props.details.clusterName,
      this.props.details.testOrProd
    );
    this.setState({
      showMpgw: "block",
      showRestOfForm: "none",
    });
  };

  setMpgwArray = (clusterName, testOrProd) => {
    // Wait for a resopnse from the backend for mpgw names for the given cluster and environment
    // let mpgwList = await this.props.getArray(clusterName, testOrProd);
    let mpgwList = ["Incognito", "Outcognito", "IceCube", "Spotify"];
    this.setState({
      mpgwList: mpgwList,
    });
  };

  updateParams = (value, paramName, form) => {
    this.props.updateParams(value, paramName, form);
  }

  checkIfAllValid = () => {
    //Check if the validators were initialized, if so update valid props to true
    if (this.validator.allValid()) {
      this.props.validationHandler(true);
    } else this.props.validationHandler(false);
  };

  testBtnClick = () => {
    this.setState({ testBtnColor: "primary", prodBtnColor: "default" });
    this.props.updateParams("test", "testOrProd", "details");
    this.validator.message("btn", "test", "required");
    this.checkIfAllValid();
  };

  prodBtnClick = () => {
    this.setState({ prodBtnColor: "primary", testBtnColor: "default" });
    this.props.updateParams("prod", "testOrProd", "details");
    this.validator.message("btn", "prod", "required");
    this.checkIfAllValid();
  };

  render() {
    const { classes } = this.props;
    // In the future the route list should come from the server
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <Autocomplete
            id="cluster"
            options={this.state.environmentsList}
            getOptionLabel={(environmentsList) => environmentsList}
            style={{ width: 300, display: this.state.showRestOfForm }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="cluster"
                variant="outlined"
                error={
                  !this.validator.fieldValid("cluster") &&
                  this.props.details.cluster != null
                }
                helperText={this.validator.getErrorMessages()["cluster"]}
              />
            )}
            onChange={(e, value) => {
              this.setState({ displayButtons: "inline-block" });
              this.props.updateParams(value, "clusterName", "details");
              this.validator.message("cluster", value, "required");
              this.checkIfAllValid();
            }}
          />
          <Button
            style={{ display: this.state.showRestOfForm }}
            variant="contained"
            color={this.state.testBtnColor}
            onClick={this.testBtnClick}
          >
            Test
          </Button>
          <Button
            style={{ display: this.state.showRestOfForm }}
            variant="contained"
            color={this.state.prodBtnColor}
            onClick={this.prodBtnClick}
          >
            Prod
          </Button>
          <br />
          <Button
            style={{ display: this.state.showRestOfForm }}
            variant="contained"
            color="primary"
            onClick={this.handleCreds}
          >
            Enter credentials
          </Button>
          <DpCredsPopup
            status={this.state.popUpStatus}
            handleClose={this.handlePopUpClose}
            updateParams={this.updateParams}
            credentials={this.props.dpCredentials}
            nextStep={this.handleCredsFinish}
          />
          <Autocomplete
            id="mpgw-name"
            options={this.state.mpgwList}
            getOptionLabel={(mpgwName) => mpgwName}
            style={{
              width: 300,
              display: this.state.showMpgw,
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Mpgw Name"
                variant="outlined"
                error={
                  !this.validator.fieldValid("mpgw") &&
                  this.props.details.mpgwName != null
                }
                helperText={this.validator.getErrorMessages()["mpgw"]}
              />
            )}
            onChange={(e, value) => {
              this.props.updateParams(value, "mpgwName", "details");
              this.validator.message("mpgw", value, "required");
              this.checkIfAllValid();
            }}
          />
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(DetailsForm);
