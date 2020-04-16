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
import HorizontalStepper from "./HorizontalStepper";
import RuleTable from "../../RuleTable";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  stepLabel: {
    fontSize: "large",
  },
});

function getSteps() {
  return ["Route details", "View Rules"];
}

class RouteStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRuleToEditIndex: -1,
      popUpStatus: false,
      stepIsValid: false, // DEBUG
      // stepIsValid: false,
      step: 0,
      // step: 2, // DEBUG
      params: {
        details: {
          clusterName: null,
          mpgwName: null,
          testOrProd: "test",
        },
        rules: [
          {
            name: "TestRule",
            srcAddr: {
              network: "Salim",
              protocol: "http",
              primaryAddress: "http://zibi.com",
              secondaryAddress: "80",
              methods: ["PUT", "GET"],
            },
            destAddr: {
              network: "Tzadok",
              protocol: "mq",
              primaryAddress: "queue_manager",
              secondaryAddress: "queue",
              methods: [],
            },
            filter: {
              filterType: "dpass",
              dpasFilter: "Nimbus",
              schemaPath: "",
            },
            slm: {
              maxFileCount: 100,
              maxFileSize: 10,
              fileSizeUnit: "mb",
              fileSizeTimeUnit: "minute",
              fileCountTimeUnit: "minute",
            },
          },
        ],
        dpCredentials: {
          username: "",
          password: "",
        },
      },
    };
  }

  updateParamState = (value, paramName, form) => {
    let object = this.state.params[form];
    object[paramName] = value;
    if (form === "details") {
      this.setState({ details: object });
    } else if (form === "dpCredentials") {
      this.setState({ dpCredentials: object });
    } else {
      alert("Something went wrong, no such form");
    }
  };

  updateRule = (rule) => {
    let newParams = JSON.parse(JSON.stringify(this.state.params));
    newParams["rules"][this.state.currentRuleToEditIndex] = rule;
    this.setState({
      params: newParams,
      currentRuleToEditIndex: -1,
    });
  };

  removeRule = (index) => {
    let newParams = JSON.parse(JSON.stringify(this.state.params));
    newParams["rules"].splice(index, 1);
    this.setState({ params: newParams });
  };

  editRule = (index) => {
    this.setState({ currentRuleToEditIndex: index });
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <DetailsForm
            details={this.state.params.details}
            updateParams={this.updateParamState}
            validationHandler={this.handleStepValidation}
            dpCredentials={this.state.params.dpCredentials}
          />
        );
      case 1:
        return (
          <div>
            {this.state.currentRuleToEditIndex === -1 ? (
              <RuleTable
                data={this.state.params}
                editRule={this.editRule}
                removeRule={this.removeRule}
              />
            ) : (
              <HorizontalStepper
                rule={
                  this.state.params.rules[this.state.currentRuleToEditIndex]
                }
                updateRule={this.updateRule}
                validationHandler={this.handleStepValidation}
              />
            )}
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  setActiveStep = (newStep) => {
    this.setState({
      step: newStep,
      // stepIsValid: false
      stepIsValid: true, // DEBUG
    });
  };

  handleStepValidation = (flag) => {
    // Set current step status, valid or not
    this.setState({ stepIsValid: flag });
  };

  initDetailsForm = () => {
    // initialize form details state beacause a press on the next button occurred
    // let a = this.state.params; // CHECK
    this.setState({
      params: {
        ...this.state.params,
        details: {
          environment:
            this.state.params.details.environment === null
              ? ""
              : this.state.params.details.projectNameValue,
          clusterName:
            this.state.params.details.clusterName === null
              ? ""
              : this.state.params.details.projectMadorValue,
          // projectTeamValue:
          //   this.state.params.details.projectTeamValue === null
          //     ? ""
          //     : this.state.params.details.projectTeamValue,
          testOrProd: "test",
        },
      },
    });
  };

  handleNext = () => {
    // Handle a press on the next button
    // const valid = this.state.stepIsValid;
    if (this.state.params.details.clusterName != null) {
      this.props.setClusterName(
        this.state.params.details.clusterName,
        this.state.params.details.testOrProd
      );
    }
    const valid = this.state.stepIsValid; // DEBUG
    if (valid) {
      this.setActiveStep(this.state.step + 1);
    } else {
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
    const newMpgwParams = JSON.parse(JSON.stringify(this.state["params"]));
    // This is the json with the params that should be sent to the backend
    console.log("PARAMS");
    console.log(newMpgwParams);
    this.props.setInput(newMpgwParams);
  };

  handlePopUpClose = () => {
    this.setState({ popUpStatus: false });
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
                <text className={classes.stepLabel}>{label}</text>
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
        {activeStep === steps.length && allValid && (
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
