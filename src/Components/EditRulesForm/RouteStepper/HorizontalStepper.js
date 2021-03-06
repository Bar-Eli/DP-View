import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FilterFormForm from "./FilterForm";
import AddressForm from "./SrcAddressForm";
import DestAddressForm from "./DestAddressForm";
import SlmForm from "./SlmForm";
import NameForm from "./NameForm";

import { Paper } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  center: {
    textAlign: "center",
  },
  navBtns: {
    textAlign: "center",
    paddingTop: "30px",
    paddingBottom: "10px",
  },
});

function getSteps() {
  return ["Rule Name", "Source", "Filter", "Destination", "SLM"];
}

// const stepsMap = { 0: "name", 1: "srcAddr", 2: "filter", 3: "destAddr" };

class HorizontalStepper extends Component {
  constructor(props) {
    super(props);
    this.steps = getSteps();
    this.state = {
      stepIsValid: false,
      step: 0,
      completed: [],
      skipped: [],
      rule: this.props.rule,
    };
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <NameForm
            updateRuleName={this.handleRuleNameChange}
            ruleName={this.state.rule.name}
            validationHandler={this.handleStepValidation}
          />
        );
      case 1:
        return (
          <AddressForm
            currSrcAddrRules={this.state.rule.srcAddr}
            setParams={this.handleRuleChange}
            validationHandler={this.handleStepValidation}
          />
        );
      case 2:
        return (
          <FilterFormForm
            setParams={this.handleRuleChange}
            currFilterRules={this.state.rule.filter}
            validationHandler={this.handleStepValidation}
          />
        );
      case 3:
        return (
          <DestAddressForm
            currDestAddrRules={this.state.rule.destAddr}
            setParams={this.handleRuleChange}
            validationHandler={this.handleStepValidation}
          />
        );
      case 4:
        return (
          <SlmForm
            currSlm={this.state.rule.slm}
            setParams={this.handleRuleChange}
            validationHandler={this.handleStepValidation}
          />
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

  handleRuleChange = (value, field, form) => {
    let newRule = JSON.parse(JSON.stringify(this.state.rule));
    newRule[form][field] = value;
    this.setState({ rule: newRule });
  };

  handleRuleNameChange = (newName, form) => {
    let newRule = JSON.parse(JSON.stringify(this.state.rule));
    newRule[form] = newName;
    this.setState({ rule: newRule });
  };

  totalSteps = () => {
    return getSteps().length;
  };

  // isStepOptional = step => {
  //   return step === 2;
  // };

  // handleSkip = () => {
  //   if (!this.isStepOptional(this.state.step)) {
  //     // You probably want to guard against something like this
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   this.setActiveStep(this.state.step + 1);
  // };

  skippedSteps = () => {
    return this.state.skipped.length;
  };

  completedSteps = () => {
    return this.state.completed.length;
  };

  allStepsCompleted = () => {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  };

  isLastStep = () => {
    return this.state.step === this.totalSteps() - 1;
  };

  handleNext = () => {
    const newActiveStep =
      this.isLastStep() && !this.allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          this.steps.findIndex((step, i) => !this.state.completed.includes(i))
        : this.state.step + 1;

    this.setActiveStep(newActiveStep);
  };

  handleBack = () => {
    // Handle a press on the back button
    this.setActiveStep(this.state.step - 1);
  };

  handleStep = (step) => () => {
    this.setActiveStep(step);
  };

  handleComplete = () => {
    // const currForm = stepsMap[this.state.step];
    const isValid = this.state.stepIsValid;
    if (isValid === true) {
      let newCompleted = this.state.completed;
      newCompleted.push(this.state.step);
      this.setState({ completed: newCompleted });

      if (
        this.state.completed.length !==
        this.totalSteps() - this.skippedSteps()
      ) {
        this.handleNext();
      } else if (this.completedSteps() === this.totalSteps()) {
        this.handleFinish();
      }
    }
  };

  handleFinish = () => {
    const rule = JSON.parse(JSON.stringify(this.state.rule));
    this.props.updateRule(rule);
    this.props.validationHandler(true);
  };

  ruleReset = () => {
    this.setActiveStep(0);
    this.setState({
      rule: {
        name: "",
        srcAddr: {
          network: "",
          protocol: "",
          primaryAddress: "",
          secondaryAddress: "",
          methods: ["", ""],
        },
        destAddr: {
          network: "",
          protocol: "",
          primaryAddress: "",
          secondaryAddress: "",
          methods: [""],
        },
        filter: {
          filterType: "",
          dpasFilter: "",
          schemaPath: "",
        },
        slm: {
          maxFileCount: "",
          fileCountTimeUnit: "",
          maxFileSize: "",
          fileSizeUnit: "",
          fileSizeTimeUnit: "",
        },
      },
    });
  };

  handleReset = () => {
    this.setActiveStep(0);
    this.setState({ completed: [] });
    this.setState({ skipped: [] });
    this.ruleReset();
  };

  isStepSkipped = (step) => {
    return this.state.skipped.includes(step);
  };

  isStepComplete = (step) => {
    return this.state.completed.includes(step);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper
          elevation={3}
          style={{ marginBottom: "25px", marginTop: "25px" }}
        >
          <Stepper alternativeLabel nonLinear activeStep={this.state.step}>
            {this.steps.map((label, index) => {
              const stepProps = {};
              const buttonProps = {};
              // if (this.isStepOptional(index)) {
              //   buttonProps.optional = (
              //     <Typography variant="caption">Optional</Typography>
              //   );
              // }
              if (this.isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepButton
                    onClick={this.handleStep(index)}
                    completed={this.isStepComplete(index)}
                    {...buttonProps}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>

          <div className={classes.center}>
            <div>
              {this.allStepsCompleted() ? (
                <div className={classes.navBtns}>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button variant="outlined" onClick={this.handleReset}>
                    Add another rule
                  </Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    {this.getStepContent(this.state.step)}
                  </Typography>
                  <div className={classes.navBtns}>
                    <Button
                      disabled={this.state.step === 0}
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
                      Next
                    </Button>
                    {/* {this.isStepOptional(this.state.step) &&
                      !this.state.completed.includes(this.state.step) && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleSkip}
                          className={classes.button}
                        >
                          Skip
                        </Button>
                      )} */}

                    {this.state.step !== this.steps.length &&
                      (this.state.completed.includes(this.state.step) ? (
                        <Typography
                          variant="caption"
                          className={classes.completed}
                        >
                          Step {this.state.step + 1} already completed
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleComplete}
                        >
                          {this.completedSteps() === this.totalSteps()
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(HorizontalStepper);
