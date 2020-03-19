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

class RouteStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      // step: 3 // FOR DEBUG
      details: {
        projectNameValue: "",
        projectMadorValue: "",
        projectTeamValue: "",
        testOrProd: ""
      },
      srcAddr: {
        network: "",
        protocol: "",
        //Url or queue manager
        primaryAddress: "",
        //Port or queue name
        secondaryAddress: "",
        //Should be empty if the protocol is mq
        method: ""
      },
      destAddr: {
        network: "",
        protocol: "",
        //Url or queue manager
        primaryAddress: "",
        //Port or queue name
        secondaryAddress: "",
        //Should be empty if the protocol is mq
        method: ""
      },
      filter: {}
    };
  }

  updateInputState = (e, paramName, form) => {
    let object = this.state[form];
    object[paramName] = e.target.value;
    if (form === "details") {
      this.setState({ details: object });
    } else if (form === "srcAddr") {
      this.setState({ srcAddr: object });
    } else if (form === "destAddr") {
      this.setState({ destAddr: object });
    } else if (form === "filter") {
      this.setState({ filter: object });
    } else {
      alert("Something went wrong, no such form");
    }
  };

  updateBtnState = (value, form, formParam) => {
    let object = this.state[form];
    object[formParam] = value;
    if (form === "details") {
      this.setState({ details: object });
    } else if (form === "srcAddr") {
      this.setState({ srcAddr: object });
    } else if (form === "destAddr") {
      this.setState({ destAddr: object });
    } else if (form === "filter") {
      this.setState({ filter: object });
    } else {
      alert("Something went wrong, no such form");
    }
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <DetailsForm
            details={this.state.details}
            updateDetailsState={this.updateInputState}
            updateDetailsBtn={this.updateBtnState}
          />
        );
      case 1:
        return <AddressForm params={this.state.srcAddr} />;
      case 2:
        return <AddressForm params={this.state.destAddr} />;
      case 3:
        return <FilterForm />;
      default:
        return "Unknown step";
    }
  };

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
                <Typography>{this.getStepContent(index)}</Typography>
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
