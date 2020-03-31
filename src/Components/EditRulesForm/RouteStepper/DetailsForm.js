import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
// import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SimpleReactValidator from "simple-react-validator";

const useStyles = theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
});

class DetailsForm extends Component {
  constructor(props) {
    super(props);
    // add environment as variable?
    this.state = {
      testBtnColor: "primary",
      prodBtnColor: "default",
      mpgwList: ["Incognito", "Outcognito", "IceCube", "Spotify"],
      environmentsList: ["Tzadok", "Salim", "Zeus"],
      displayMpgwSelection: "none",
      displayButtons: "none"
      // verify if form is complete somehow
    };

    this.validator = new SimpleReactValidator();
    this.validator.message(
      "Environment",
      this.props.details.environment,
      "required"
    );
    this.validator.message(
      "Cluster",
      this.props.details.clusterName,
      "required"
    );

    this.checkIfAllValid();
  }

  checkIfAllValid = () => {
    //Check if the validators were initialized, if so update valid props to true
    if (this.validator.allValid()) {
      this.props.validationHandler(true);
    } else this.props.validationHandler(false);
  };

  testBtnClick = () => {
    this.setState({ testBtnColor: "primary", prodBtnColor: "default" });
  };

  prodBtnClick = () => {
    this.setState({ prodBtnColor: "primary", testBtnColor: "default" });
  };

  render() {
    const { classes } = this.props;
    // In the future the route list should come from the server

    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <Autocomplete
            id="environment"
            options={this.state.environmentsList}
            getOptionLabel={environmentsList => environmentsList}
            style={{ width: 300, marginBottom: "50px" }}
            renderInput={params => (
              <TextField
                {...params}
                label="Environment"
                variant="outlined"
                error={
                  !this.validator.fieldValid("Environment") &&
                  this.props.details.environment != null
                }
                helperText={this.validator.getErrorMessages()["Environment"]}
              />
            )}
            onChange={(e, value) => {
              this.setState({ displayMpgwSelection: "block" });
              this.setState({ displayButtons: "inline-block" });
              this.props.updateParams(value, "environment", "details");

              this.validator.message("Environment", value, "required");
              this.checkIfAllValid();
            }}
          />
          <Autocomplete
            id="mpgw-name"
            options={this.state.mpgwList}
            getOptionLabel={mpgwName => mpgwName}
            style={{
              width: 300,
              display: `${this.state.displayMpgwSelection}`
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Mpgw Name"
                variant="outlined"
                error={
                  !this.validator.fieldValid("Cluster") &&
                  this.props.details.clusterName != null
                }
                helperText={this.validator.getErrorMessages()["Cluster"]}
              />
            )}
            onChange={(e, value) => {
              this.props.updateParams(value, "clusterName", "details");

              this.validator.message("Cluster", value, "required");
              this.checkIfAllValid();
            }}
          />
          <br />
          <Button
            variant="contained"
            color={this.state.testBtnColor}
            onClick={this.testBtnClick}
            style={{ display: `${this.state.displayButtons}` }}
          >
            Test
          </Button>
          <Button
            variant="contained"
            color={this.state.prodBtnColor}
            onClick={this.prodBtnClick}
            style={{ display: `${this.state.displayButtons}` }}
          >
            Prod
          </Button>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(DetailsForm);
