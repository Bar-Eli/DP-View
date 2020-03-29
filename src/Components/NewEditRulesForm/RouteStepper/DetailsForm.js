import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
// import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
      testBtnColor: "default",
      prodBtnColor: "default",
      mpgwList: ["Incognito", "Outcognito", "IceCube", "Spotify"],
      environmentsList: ["Tzadok", "Salim", "Zeus"],
      displayMpgwSelection: "none",
      displayButtons: "none"
      // verify if form is complete somehow
    };
  }

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
              <TextField {...params} label="Environment" variant="outlined" />
            )}
            onChange={(e, value) => {
              this.setState({ displayMpgwSelection: "block" });
              this.setState({ displayButtons: "inline-block" });
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
              <TextField {...params} label="Mpgw Name" variant="outlined" />
            )}
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