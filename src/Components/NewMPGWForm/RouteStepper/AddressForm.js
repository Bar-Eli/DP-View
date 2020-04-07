import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SimpleReactValidator from "simple-react-validator";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  center: {
    width: "auto",
  },
  centerMargin: {
    margin: "auto",
    marginBlockEnd: "auto",
    display: "block",
    textAlign: "left",
  },
  methodLabel: {
    marginBottom: "5px",
    marginTop: "0",
  },
});

class AddressForm extends Component {
  constructor(props) {
    super(props);
    // verify if form is complete somehow
    this.state = {
      httpBtnColor: "primary",
      mqBtnColor: "default",
      network: undefined,
      protocol: "http",
      primaryAddress: "IP / URL",
      secondaryAddress: "Port",
      showMethods: "block",
      methodList: ["POST", "PUT", "GET"],
      checkedValues: { POST: false, PUT: false, GET: false },
      isCheckboxValid: false,
      // showMethodError: false,
      // wasMethodListTouched: false
      // ,
      // showNetworkValidText: true
    };

    this.validator = new SimpleReactValidator();
    this.validator.message(
      "Primary Address",
      this.props.currRule.primaryAddress,
      "required"
    );
    this.validator.message(
      "Secondary Address",
      this.props.currRule.secondaryAddress,
      "required"
    );
    this.validator.message("Network", this.props.currRule.network, "required");

    this.checkIfAllValid();

    if (this.props.whichForm === "destAddr") {
      this.props.validationHandler(false);
    }

    this.props.setParams("http", "protocol", this.props.whichForm); // Default protocol
  }

  checkIfAllValid = () => {
    //Check if the validators were initialized, if so update valid props to true
    if (this.state.isCheckboxValid === false) {
      console.log("Its checked!");
    } else if (this.state.isCheckboxValid === true) {
      console.log("It is not checked!");
    }
    if (this.validator.allValid() && this.state.isCheckboxValid === true) {
      this.props.validationHandler(true);
    } else this.props.validationHandler(false);
  };

  httpBtnClick = () => {
    if (this.props.currRule.methods.length === 0) {
      this.setState({
        isCheckboxValid: false,
      });
    }
    this.setState({
      httpBtnColor: "primary",
      mqBtnColor: "default",
      showMethods: "block",
      primaryAddress: "IP / URL",
      secondaryAddress: "Port",
    });
    this.props.setParams("http", "protocol", this.props.whichForm);
  };

  mqBtnClick = () => {
    this.setState({
      mqBtnColor: "primary",
      httpBtnColor: "default",
      showMethods: "none",
      primaryAddress: "Queue manager",
      secondaryAddress: "Queue name",
      isCheckboxValid: true,
    });
    this.props.setParams("mq", "protocol", this.props.whichForm);
  };

  handleChangeNetwork = (event) => {
    // setAge(event.target.value);
    this.props.setParams(event.target.value, "network", this.props.whichForm);
  };

  async handleCheckMethod(method) {
    let newChecked = JSON.parse(JSON.stringify(this.state.checkedValues));
    newChecked[method] = !newChecked[method];
    // newChecked[method] = true;
    this.setState({ checkedValues: newChecked });
    let newMethods = [];
    for (const method in newChecked) {
      if (newChecked[method]) {
        newMethods.push(method);
      }
    }
    await this.props.setParams(
      newMethods.slice(),
      "methods",
      this.props.whichForm
    );
    console.log("initial check state is: " + this.state.isCheckboxValid);
    this.setState((prevState) => {
      const newState = prevState;
      newState["isCheckboxValid"] = this.checkCheckboxValidation();
      return newState;
    });
    console.log("After change, check state is: " + this.state.isCheckboxValid);
  }

  checkCheckboxValidation = () => {
    if (
      this.props.currRule.methods.length === 0 &&
      this.props.currRule.protocol === "http"
    ) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <br />
          <h5 className={classes.center}>Protocol</h5>

          <Button
            variant="contained"
            color={this.state.httpBtnColor}
            onClick={this.httpBtnClick}
          >
            http
          </Button>
          <Button
            variant="contained"
            color={this.state.mqBtnColor}
            onClick={this.mqBtnClick}
          >
            mq
          </Button>
          <br />
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              // helperText={this.validator.getErrorMessages()["Network"]}
            >
              Network
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.age}
              onChange={(e) => {
                this.handleChangeNetwork(e);

                this.validator.message("Network", e.target.value, "required");
                this.checkIfAllValid();
              }}
            >
              <MenuItem value={"Salim"}>Salim</MenuItem>
              <MenuItem value={"Tzadok"}>Tzadok</MenuItem>
              <MenuItem value={"Zeus"}>Zeus</MenuItem>
            </Select>
            {/* {this.state.showNetworkValidText ? (
              <small style={{ color: "grey" }}>
                The network field is required.
              </small>
            ) : (
              ""
            )} */}
            <FormHelperText
              error={
                !this.validator.fieldValid("Network") &&
                this.props.currRule.network != null
              }
            >
              the network field is required.
            </FormHelperText>
          </FormControl>

          <TextField
            id="primary-address"
            label={this.state.primaryAddress}
            onChange={(e) => {
              this.props.setParams(
                e.target.value,
                "primaryAddress",
                this.props.whichForm
              );
              if (this.state.httpBtnColor === "primary") {
                this.validator.message(
                  "Primary Address",
                  e.target.value,
                  "required|url"
                );
              } else if (this.state.mqBtnColor === "primary") {
                // let regexPattern = "[A-Z\\_]+";
                // function escapeRegExp(string) {
                //   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
                // }
                // regexPattern = escapeRegExp(regexPattern);
                this.validator.message(
                  "Primary Address",
                  e.target.value,
                  "required"
                );
              }
              this.checkIfAllValid();
            }}
            error={
              !this.validator.fieldValid("Primary Address") &&
              this.props.currRule.primaryAddress != null
            }
            helperText={this.validator.getErrorMessages()["Primary Address"]}
          />
          <TextField
            id="secondary-address"
            label={this.state.secondaryAddress}
            onChange={(e) => {
              this.props.setParams(
                e.target.value,
                "secondaryAddress",
                this.props.whichForm
              );
              if (this.state.httpBtnColor === "primary") {
                this.validator.message(
                  "Secondary Address",
                  e.target.value,
                  "required|integer"
                );
              } else if (this.state.mqBtnColor === "primary") {
                this.validator.message(
                  "Secondary Address",
                  e.target.value,
                  "required"
                );
              }
              this.checkIfAllValid();
            }}
            error={
              !this.validator.fieldValid("Secondary Address") &&
              this.props.currRule.primaryAddress != null
            }
            helperText={this.validator.getErrorMessages()["Secondary Address"]}
          />
          <br />
          <br />
          <div
            className={classes.centerMargin}
            style={{ display: this.state.showMethods }}
          >
            <h5 className={classes.methodLabel}>Method</h5>
            {this.state.methodList.map((method) => (
              <div>
                <FormControlLabel
                  value={method}
                  control={<Checkbox />}
                  label={method}
                  checked={this.state.checkedValues[method]}
                  onChange={() => {
                    this.handleCheckMethod(method);

                    this.checkIfAllValid();
                  }}
                  required={true}
                />
              </div>
            ))}
            <FormHelperText error={this.state.isCheckboxValid === false}>
              the method field is required.
            </FormHelperText>
          </div>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(AddressForm);
