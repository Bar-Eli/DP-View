import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

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
      prodBtnColor: "default"
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
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="project-name" label="Project Name" />
          <TextField id="project-mador" label="Mador" />
          <TextField
            id="project-team"
            label="Team"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SupervisedUserCircle />
                </InputAdornment>
              )
            }}
          />
          <br />
          <Button
            variant="contained"
            color={this.state.testBtnColor}
            onClick={this.testBtnClick}
          >
            Test
          </Button>
          <Button
            variant="contained"
            color={this.state.prodBtnColor}
            onClick={this.prodBtnClick}
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
