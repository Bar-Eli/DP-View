import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FilterFormForm from "../../NewMPGWForm/RouteStepper/FilterForm";
import AddressForm from "../../NewMPGWForm/RouteStepper/AddressForm";
import NameForm from "./NameForm";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function HorizontalNonLinearAlternativeLabelStepper({
  rules,
  onRulesChange
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  // const [params, setParams] = React.useState(parameters);
  const [rulesIndex, setRulesIndex] = React.useState(0);
  const steps = getSteps();

  function getSteps() {
    return ["Rule Name", "Source", "Filter", "Destination"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <NameForm updateRuleName={handleRuleNameChange}></NameForm>;
      case 1:
        return (
          <AddressForm
            whichForm="srcAddr"
            setParams={handleRuleChange}
          ></AddressForm>
        );
      case 2:
        return <FilterFormForm setParams={handleRuleChange}></FilterFormForm>;
      case 3:
        return (
          <AddressForm
            whichForm="destAddr"
            setParams={handleRuleChange}
          ></AddressForm>
        );
      default:
        return "Unknown step";
    }
  }

  const handleRuleChange = (value, field, form) => {
    //change the field to the value from function in the correct form
    const newRules = rules.map((currRules, index) => {
      return index === rulesIndex
        ? {
            ...currRules,
            [form]: {
              ...currRules[form],
              [field]: value
            }
          }
        : currRules;
    });
    onRulesChange(newRules);
  };

  const handleRuleNameChange = (newName, form) => {
    //change the field to the value from function in the correct form
    const newRules = rules.map((currRules, index) => {
      return index === rulesIndex
        ? {
            ...currRules,
            [form]: {
              ...currRules[form],
              name: newName
            }
          }
        : currRules;
    });
    onRulesChange(newRules);
  };

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = step => {
    return step === 2;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    } else if (completedSteps() === totalSteps() - 1) {
      handleFinish();
    }
  };

  const handleFinish = () => {
    onRulesChange(rules);
    setRulesIndex(+1);
    let newRules = rules;
    newRules.push({
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
    });
    onRulesChange(newRules);
    rules = newRules;
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const handleRuleDelete = index => {
    let newRulesArray = rules.filter((value, ruleIndex) => {
      return ruleIndex !== index;
    });
    onRulesChange(newRulesArray);
    if (rulesIndex > 1) {
      setRulesIndex(rulesIndex - 1);
    }
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root} style={{ marginBottom: "200px" }}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {isStepOptional(activeStep) && !completed.has(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
