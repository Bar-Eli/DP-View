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
import HorizontalNonLinearAlternativeLabelStepper from "./HorizontalStepper";
import Overview from "./Overview";
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
      step: 0,
      // step: 3 // FOR DEBUG
      params: {
        details: {
          projectNameValue: "",
          projectMadorValue: "",
          projectTeamValue: "",
          clusterName: "", // **
          testOrProd: ""
        },
        rules: [
          {
            name: "", // **
            srcAddr: {
              network: "",
              protocol: "",
              primaryAddress: "",
              secondaryAddress: "",
              methods: ["", ""]
            },
            destAddr: {
              network: "",
              protocol: "",
              primaryAddress: "",
              secondaryAddress: "",
              methods: [""]
            },
            filter: {
              filterType: "",
              dpasFilter: "", // **
              schemaPath: ""
            }
          }
        ],
        dpCredentials: {
          // **
          username: "",
          password: ""
        }
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
            details={this.state.params.details}
            updateParams={this.updateParamState}
          />
        );
      case 1:
        return (
          // <AddressForm
          //   params={this.state.srcAddr}
          //   whichForm="srcAddr"
          //   updateParams={this.updateParamState}
          //   updateTableParams={this.updateTableParams}
          //   tableHeader="Add New Rules"
          // />
          //<HorizontalStepper
          // setInput={this.setInput}
          // hideCreate={this.hideCreate}
          // />
          <HorizontalNonLinearAlternativeLabelStepper
            rules={this.state.params.rules}
            // update the parameters
            onRulesChange={newRules => {
              this.setState({
                params: { ...this.state.params, rules: newRules }
              });
            }}
          ></HorizontalNonLinearAlternativeLabelStepper>
        );
      case 2:
        return (
          // <AddressForm
          //   params={this.state.destAddr}
          //   whichForm="destAddr"
          //   updateParams={this.updateParamState}
          //   updateTableParams={this.updateTableParams}
          //   tableHeader="Add New Rules"
          // />
          //<Overview></Overview>
          <Overview></Overview>
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