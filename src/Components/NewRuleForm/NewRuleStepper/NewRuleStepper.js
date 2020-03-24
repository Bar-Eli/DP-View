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
import AddressForm from "../../NewMPGWForm/RouteStepper/AddressForm";
import { render } from "react-dom";
import FilterForm from "../../NewMPGWForm/RouteStepper/FilterForm";

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
      details: { testOrProd: "", mpgwName: "" },
      srcAddr: {
        srcTableData: [],
        //Should be empty if the protocol is mq
        method: ""
      },
      destAddr: {
        destTableData: [],
        //Should be empty if the protocol is mq
        method: ""
      },
      filter: {
        filterType: "",
        //should be empty if its not dexter filter
        dexterFilter: "",
        //should be empty if its not schema filter
        schemaPath: ""
      }
      // step: 3 // FOR DEBUG
    };
  }

  updateParamState = (value, paramName, form) => {
    let object = this.state[form];
    object[paramName] = value;
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

  updateTableParams = (newData, isSrc) => {
    if (isSrc === "true") {
      const srcAddrObject = this.state.srcAddr;
      srcAddrObject.srcTableData.push(newData);
      this.setState({ srcAddr: srcAddrObject });
    } else if (isSrc === "false") {
      const destAddrObject = this.state.destAddr;
      destAddrObject.destTableData.push(newData);
      this.setState({ destAddr: destAddrObject });
    }
    alert("You have submitted the rules!");
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <DetailsForm
            details={this.state.details}
            updateParams={this.updateParamState}
          />
        );
      case 1:
        return (
          <AddressForm
            params={this.state.srcAddr}
            whichForm="srcAddr"
            updateParams={this.updateParamState}
            updateTableParams={this.updateTableParams}
            tableHeader="Current Rules"
          />
        );
      case 2:
        return (
          <AddressForm
            params={this.state.destAddr}
            whichForm="destAddr"
            updateParams={this.updateParamState}
            updateTableParams={this.updateTableParams}
            tableHeader="Current Rules"
          />
        );
      case 3:
        return (
          <FilterForm
            details={this.state.filter}
            updateParams={this.updateParamState}
          />
        );
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

  handleFinish = () => {
    const newMpgwParams = `[details: ${JSON.stringify(
      this.state.details
    )}, srcAddr: ${JSON.stringify(
      this.state.srcAddr
    )}, destAddr: ${JSON.stringify(
      this.state.destAddr
    )}, filter: ${JSON.stringify(this.state.filter)}]`;

    // This is the json with the params that should be sent to the backend
    console.log(newMpgwParams);
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
                      onClick={
                        activeStep === steps.length - 1
                          ? this.handleFinish
                          : this.handleNext
                      }
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
