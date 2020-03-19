import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DetailsForm from "./DetailsForm";
import AddressForm from "./AddressForm";
import { render } from "react-dom";
import FilterForm from "./FilterForm";

const useStyles = theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  stepLabel: {
    fontSize: "large"
  }
});

function getSteps() {
  return ["Route details", "Source", "Destination", "Filter"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DetailsForm />;
    case 1:
      return <AddressForm />;
    case 2:
      return <AddressForm />;
    case 3:
      return <FilterForm />;
    default:
      return "Unknown step";
  }
}

class RouteStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
      // step: 3 // FOR DEBUG
    };
  }
  setActiveStep = newStep => {
    // React.useState(0)
    this.setState({ step: newStep });
  };

  handleNext = () => {
    this.setActiveStep(this.state.step + 1);
  };

  handleBack = () => {
    this.setActiveStep(this.state.step - 1);
  };

  handleReset = () => {
    this.setActiveStep(0);
  };
  render() {
    const { classes } = this.props;
    const activeStep = this.state.step;
    const steps = getSteps();
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel className={classes.stepLabel}>
                <a className={classes.stepLabel}>{label}</a>
              </StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleReset}
              className={classes.button}
            >
              Edit
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}
export default withStyles(useStyles, { withTheme: true })(RouteStepper);
