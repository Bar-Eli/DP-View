import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SimpleReactValidator from "simple-react-validator";
import FormHelperText from "@material-ui/core/FormHelperText";

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
      httpBtnColor: "default",
      mqBtnColor: "default",
      // network: ""
      // protocol: ""
      primaryAddress: "IP / URL",
      secondaryAddress: "Port",
      showMethods: "block",
      methodList: ["POST", "PUT", "GET"],
      checkedValues: { POST: false, PUT: false, GET: false },
    };

    this.validator = new SimpleReactValidator();
    this.validator.message(
      "Primary Address",
      this.props.currSrcAddrRules.primaryAddress,
      "required"
    );
    this.validator.message(
      "Secondary Address",
      this.props.currSrcAddrRules.secondaryAddress,
      "required"
    );

    if (this.props.currSrcAddrRules.protocol === "http") {
      this.validator.message(
        "Method",
        this.props.currSrcAddrRules.methods,
        "required"
      );
    } else if (this.props.currSrcAddrRules.protocol === "mq") {
      //cancel the checkbox validation
      this.validator.message("Method", this.props.currSrcAddrRules.methods, "");
    }

    this.checkIfAllValid();
  }

  checkIfAllValid = () => {
    //Check if the validators were initialized, if so update valid props to true
    if (this.validator.allValid()) {
      this.props.validationHandler(true);
    } else this.props.validationHandler(false);
  };

  httpBtnClick = () => {
    this.setState({
      httpBtnColor: "primary",
      mqBtnColor: "default",
      showMethods: "block",
      primaryAddress: "IP / URL",
      secondaryAddress: "Port",
    });
    this.props.setParams("http", "protocol", "srcAddr");

    this.validator.message(
      "Method",
      this.props.currSrcAddrRules.methods,
      "required"
    );
  };

  mqBtnClick = () => {
    this.setState({
      mqBtnColor: "primary",
      httpBtnColor: "default",
      showMethods: "none",
      primaryAddress: "Queue manager",
      secondaryAddress: "Queue name",
    });
    this.props.setParams("mq", "protocol", "srcAddr");

    this.validator.message("Method", this.props.currSrcAddrRules.methods, "");
  };

  handleChangeNetwork = (event) => {
    // setAge(event.target.value);
    this.props.setParams(event.target.value, "network", "srcAddr");
  };

  handleCheckMethod(method) {
    /*
        this.setState(state => ({
          checkedValues: state.checkedValues.includes(method)
            ? state.checkedValues.filter(c => c !== method)
            : [...state.checkedValues, method]
        }));
        */
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

    this.validator.message("Method", newMethods, "required");

    this.props.setParams(newMethods.slice(), "methods", "srcAddr");
  }

  componentDidMount() {
    this.props.currSrcAddrRules.protocol === "http"
      ? this.setState((prevState) => {
          const newState = prevState;
          // newState.protocol = "http";
          // newState.network = this.props.currSrcAddrRules.network;
          // newState.primaryAddressValue = this.props.currSrcAddrRules.primaryAddress;
          // newState.secondaryAddressValue = this.props.currSrcAddrRules.secondaryAddress;
          newState.httpBtnColor = "primary";
          newState.mqBtnColor = "default";
          newState.showMethods = "block";
          newState.primaryAddress = "IP / URL";
          newState.secondaryAddress = "Port";
          //mark checkboxes of methods
          const currMethods = this.props.currSrcAddrRules.methods;
          currMethods.forEach((method) => {
            newState.checkedValues[method] = true;
          });

          return newState;
        })
      : this.setState((prevState) => {
          const newState = prevState;
          // newState.protocol = "mq";
          // newState.network = this.props.currSrcAddrRules.network;
          // newState.primaryAddressValue = this.props.currSrcAddrRules.primaryAddress;
          // newState.secondaryAddressValue = this.props.currSrcAddrRules.secondaryAddress;
          newState.mqBtnColor = "primary";
          newState.httpBtnColor = "default";
          newState.showMethods = "none";
          newState.primaryAddress = "Queue manager";
          newState.secondaryAddress = "Queue name";
          newState.showMethods = "none";
          return newState;
        });
  }

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
            <InputLabel id="demo-simple-select-label">Network</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.props.currSrcAddrRules.network}
              onChange={this.handleChangeNetwork}
            >
              <MenuItem value={"Salim"}>Salim</MenuItem>
              <MenuItem value={"Tzadok"}>Tzadok</MenuItem>
              <MenuItem value={"Zeus"}>Zeus</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="primary-address"
            label={this.state.primaryAddress}
            value={this.props.currSrcAddrRules.primaryAddress}
            onChange={(e) => {
              this.props.setParams(e.target.value, "primaryAddress", "srcAddr");
              if (this.state.httpBtnColor === "primary") {
                this.validator.message(
                  "Primary Address",
                  e.target.value,
                  "required"
                );
              } else if (this.state.mqBtnColor === "primary") {
                // const regexPattern = new RegExp("[A-Z/\\_/]+", "g");
                this.validator.message(
                  "Primary Address",
                  e.target.value,
                  // `required|regex:${regexPattern}`
                  "required"
                );
              }
              this.checkIfAllValid();
            }}
            error={
              !this.validator.fieldValid("Primary Address")
              // &&
              // this.props.currSrcAddrRules.primaryAddress === ""
            }
            helperText={this.validator.getErrorMessages()["Primary Address"]}
          />
          <TextField
            id="secondary-address"
            label={this.state.secondaryAddress}
            value={this.props.currSrcAddrRules.secondaryAddress}
            onChange={(e) => {
              this.props.setParams(
                e.target.value,
                "secondaryAddress",
                "srcAddr"
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
              !this.validator.fieldValid("Secondary Address")
              // &&
              // this.props.currSrcAddrRules.secondaryAddress === ""
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
                />
              </div>
            ))}
            <FormHelperText
              error={this.props.currSrcAddrRules.methods.length === 0}
            >
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
