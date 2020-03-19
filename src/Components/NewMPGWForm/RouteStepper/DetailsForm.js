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
    this.props.updateDetailsBtn("test", "details", "testOrProd");
  };

  prodBtnClick = () => {
    this.setState({ prodBtnColor: "primary", testBtnColor: "default" });
    this.props.updateDetailsBtn("prod", "details", "testOrProd");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="project-name"
            label="Project Name"
            value={this.props.details.projectNameValue}
            onChange={e =>
              this.props.updateDetailsState(e, "projectNameValue", "details")
            }
          />
          <TextField
            id="project-mador"
            label="Mador"
            value={this.props.details.projectMadorValue}
            onChange={e =>
              this.props.updateDetailsState(e, "projectMadorValue", "details")
            }
          />
          <TextField
            id="project-team"
            label="Team"
            value={this.props.details.projectTeamValue}
            onChange={e =>
              this.props.updateDetailsState(e, "projectTeamValue", "details")
            }
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
