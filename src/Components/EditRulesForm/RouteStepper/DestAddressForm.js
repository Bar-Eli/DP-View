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

const useStyles = theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  center: {
    width: "auto"
  },
  centerMargin: {
    margin: "auto",
    marginBlockEnd: "auto",
    display: "block",
    textAlign: "left"
  },
  methodLabel: {
    marginBottom: "5px",
    marginTop: "0"
  }
});

class DestAddressForm extends Component {
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
      checkedValues: { POST: false, PUT: false, GET: false }
    };

    this.validator = new SimpleReactValidator();
    this.validator.message(
      "Primary Address",
      this.props.currDestAddrRules.primaryAddress,
      "required"
    );
    this.validator.message(
      "Secondary Address",
      this.props.currDestAddrRules.secondaryAddress,
      "required"
    );

    this.props.validationHandler(false);

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
      secondaryAddress: "Port"
    });
    this.props.setParams("http", "protocol", "destAddr");
  };

  mqBtnClick = () => {
    this.setState({
      mqBtnColor: "primary",
      httpBtnColor: "default",
      showMethods: "none",
      primaryAddress: "Queue manager",
      secondaryAddress: "Queue name"
    });
    this.props.setParams("mq", "protocol", "destAddr");
  };

  handleChangeNetwork = event => {
    // setAge(event.target.value);
    this.props.setParams(event.target.value, "network", "destAddr");
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
    this.props.setParams(newMethods.slice(), "methods", "destAddr");
  }

  componentDidMount() {
    this.props.currDestAddrRules.protocol === "http"
      ? this.setState(prevState => {
          const newState = prevState;
          // newState.protocol = "http";
          // newState.network = this.props.currDestAddrRules.network;
          // newState.primaryAddressValue = this.props.currDestAddrRules.primaryAddress;
          // newState.secondaryAddressValue = this.props.currDestAddrRules.secondaryAddress;
          newState.httpBtnColor = "primary";
          newState.mqBtnColor = "default";
          newState.showMethods = "block";
          newState.primaryAddress = "IP / URL";
          newState.secondaryAddress = "Port";
          //mark checkboxes of methods
          const currMethods = this.props.currDestAddrRules.methods;
          currMethods.forEach(method => {
            newState.checkedValues[method] = true;
          });

          return newState;
        })
      : this.setState(prevState => {
          const newState = prevState;
          // newState.protocol = "mq";
          // newState.network = this.props.currDestAddrRules.network;
          // newState.primaryAddressValue = this.props.currDestAddrRules.primaryAddress;
          // newState.secondaryAddressValue = this.props.currDestAddrRules.secondaryAddress;
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
              value={this.props.currDestAddrRules.network}
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
            value={this.props.currDestAddrRules.primaryAddress}
            onChange={e => {
              this.props.setParams(
                e.target.value,
                "primaryAddress",
                "destAddr"
              );
              this.validator.message(
                "Primary Address",
                e.target.value,
                "required"
              );
              this.checkIfAllValid();
            }}
            error={
              !this.validator.fieldValid("Primary Address") &&
              this.props.currDestAddrRules.primaryAddress === ""
            }
            helperText={this.validator.getErrorMessages()["Primary Address"]}
          />
          <TextField
            id="secondary-address"
            label={this.state.secondaryAddress}
            value={this.props.currDestAddrRules.secondaryAddress}
            onChange={e => {
              this.props.setParams(
                e.target.value,
                "secondaryAddress",
                "destAddr"
              );
              this.validator.message(
                "Secondary Address",
                e.target.value,
                "required"
              );
              this.checkIfAllValid();
            }}
            error={
              !this.validator.fieldValid("Secondary Address") &&
              this.props.currDestAddrRules.secondaryAddress === ""
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
            {this.state.methodList.map(method => (
              <div>
                <FormControlLabel
                  value={method}
                  control={<Checkbox />}
                  label={method}
                  checked={this.state.checkedValues[method]}
                  onChange={() => this.handleCheckMethod(method)}
                />
              </div>
            ))}
          </div>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(DestAddressForm);
