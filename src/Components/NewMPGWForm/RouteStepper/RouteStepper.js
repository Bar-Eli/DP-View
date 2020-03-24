import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DetailsForm from "./DetailsForm";
// import HorizontalStepper from "./HorizontalStepper";
// import Overview from "./Overview";
// import AddressForm from "./AddressForm";
// import FilterForm from "./FilterForm";

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
  return ["Route details", "Rules", "Overview"];
}

class RouteStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIsValid: false,
      step: 0,
      // step: 3 // FOR DEBUG
      details: {
        projectNameValue: null,
        projectMadorValue: null,
        projectTeamValue: null,
        testOrProd: "test"
      },
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
            validationHandler={this.handleStepValidation}
          />
        );
      case 1:
        return (
          // <AddressForm
          //   params={this.state.srcAddr}
          //   whichForm="srcAddr"
          //   updateParams={this.updateParamState}
          //   updateTableParams={this.updateTableParams}
          //   validationHandler={this.handleStepValidation} 
          //   tableHeader="Add New Rules"
          // />
          //<HorizontalStepper
            // setInput={this.setInput}
            // hideCreate={this.hideCreate}
          // />
            <a>aaa</a>

        );
      case 2:
        return (
          // <AddressForm
          //   params={this.state.destAddr}
          //   whichForm="destAddr"
          //   updateParams={this.updateParamState}
          //   updateTableParams={this.updateTableParams}
          //   validationHandler={this.handleStepValidation}
          //   tableHeader="Add New Rules"
          // />
          //<Overview></Overview>
            <a>aaa</a>
        );
      case 3:
        return (
      //     <FilterForm
      //       details={this.state.filter}
      //       updateParams={this.updateParamState}
      //       validationHandler={this.handleStepValidation}
      //     />
            <a>aaa</a>
        );
      default:
        return "Unknown step";
    }
  };

  setActiveStep = newStep => {
    // React.useState(0)
    this.setState({ 
      step: newStep,
      stepIsValid: false
    });
  };

  handleStepValidation = (flag) => {
    // Set current step status, valid or not
    this.setState({ stepIsValid: flag });
  };

  initDetailsForm = () => {
    // initialize form details state beacause a press on the next button occurred
    this.setState({
      details: {
        projectNameValue: this.state.details.projectNameValue === null ? "" : this.state.details.projectNameValue,
        projectMadorValue: this.state.details.projectMadorValue === null ? "" : this.state.details.projectMadorValue,
        projectTeamValue: this.state.details.projectTeamValue === null ? "" : this.state.details.projectTeamValue,
        testOrProd: "test"
      }
    })
  }

  handleNext = () => {
    // Handle a press on the next button
    const valid = this.state.stepIsValid;
    if(valid){
      this.setActiveStep(this.state.step + 1);  
    }
    else{
      this.initDetailsForm();
    }
  };

  handleBack = () => {
    // Handle a press on the back button
    this.setActiveStep(this.state.step - 1);
  };

  handleFinish = () => {
    // Handle a press on the finish button
    this.setActiveStep(this.state.step + 1);

    const newMpgwParams = {
      details: this.state.details,
      srcAddr: this.state.srcAddr,
      destAddr: this.state.destAddr,
      filter: this.state.filter
    };
    // This is the json with the params that should be sent to the backend
    console.log(newMpgwParams);
    this.props.setInput(newMpgwParams);
  };

  handleReset = () => {
    this.props.hideCreate();
    this.setActiveStep(0);
  };

  render() {
    const { classes } = this.props;
    const activeStep = this.state.step;
    const allValid = this.state.stepIsValid;
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
        {activeStep === steps.length && allValid &&(
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
