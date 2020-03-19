import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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
    display: "block"
  }
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
      httpMethod: undefined,
      showMethods: "block"
    };
  }

  httpBtnClick = () => {
    this.setState({
      httpBtnColor: "primary",
      mqBtnColor: "default",
      showMethods: "block",
      primaryAddress: "IP / URL",
      secondaryAddress: "Port"
    });
  };

  mqBtnClick = () => {
    this.setState({
      mqBtnColor: "primary",
      httpBtnColor: "default",
      showMethods: "none",
      primaryAddress: "Queue manager",
      secondaryAddress: "Queue name"
    });
  };

  handleChangeNetwork = event => {
    // setAge(event.target.value);
    this.setState({ network: event.target.value });
  };

  handleChangeHttpMethod = event => {
    // setAge(event.target.value);
    this.setState({ httpMethod: event.target.value });
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
            <InputLabel id="demo-simple-select-label">Network</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.age}
              onChange={this.handleChangeNetwork}
            >
              <MenuItem value={"Salim"}>Salim</MenuItem>
              <MenuItem value={"Tzadok"}>Tzadok</MenuItem>
              <MenuItem value={"Zeus"}>Zeus</MenuItem>
            </Select>
          </FormControl>

          <TextField id="primary-address" label={this.state.primaryAddress} />
          <TextField
            id="secondary-address"
            label={this.state.secondaryAddress}
          />
          <br />
          <br />
          <div
            className={classes.centerMargin}
            style={{ display: this.state.showMethods }}
          >
            <h5 className={classes.centerMargin}>Method</h5>
            <RadioGroup
              aria-label="httpMethod"
              name="httpMethod"
              value={this.state.httpMethod}
              onChange={this.handleChangeHttpMethod}
            >
              <FormControlLabel value="GET" control={<Radio />} label="GET" />
              <FormControlLabel value="POST" control={<Radio />} label="POST" />
              <FormControlLabel value="PUT" control={<Radio />} label="PUT" />
            </RadioGroup>
          </div>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(AddressForm);
