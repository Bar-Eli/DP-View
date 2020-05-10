import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FilterForm from "../../NewMPGWForm/RouteStepper/FilterForm";
import AddressForm from "../../NewMPGWForm/RouteStepper/AddressForm";
import NameForm from "./NameForm";
import {Paper} from "@material-ui/core";
import SlmForm from "./SlmForm";
import BackendRequests from "../../../BackendHandlers/BackendRequests";


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
    }
});

function getSteps() {
    return ["Rule Name", "Source", "Filter", "Destination", "SLM"];
}

const stepsMap = {
    0: "name",
    1: "srcAddr",
    2: "filter",
    3: "destAddr",
    4: "slm",
};

class HorizontalStepper extends Component {
    constructor(props) {
        super(props);
        this.steps = getSteps();
        this.state = {
            stepIsValid: false,
            // stepIsValid: true, // DEBUG
            step: 0,
            // step: 4, // DEBUG
            srcPortFree: true,
            completed: [],
            skipped: [],
            rule: {
                name: null,
                srcAddr: {
                    network: "",
                    protocol: "http",
                    primaryAddress: "",
                    secondaryAddress: "",
                    methods: [],
                },
                destAddr: {
                    network: "",
                    protocol: "http",
                    primaryAddress: "",
                    secondaryAddress: "",
                    methods: [],
                },
                filter: {
                    filterType: "",
                    dpasFilter: "",
                    schemaPath: "",
                    schemaContent: "",
                    schemaType: ""
                },
                slm: {
                    maxFileCount: null,
                    fileCountTimeUnit: null,
                    maxFileSize: null,
                    fileSizeUnit: null,
                    fileSizeTimeUnit: null,
                },
            },
        };

        if (this.props.ruleToEdit !== null) {
            Object.assign(this.state, {rule: this.props.ruleToEdit,});
        }

    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <NameForm
                        validationHandler={this.handleStepValidation}
                        updateRuleName={this.handleRuleNameChange}
                        ruleName={this.state.rule.name}
                    />
                );
            case 1:
                return (
                    <AddressForm
                        whichForm="srcAddr"
                        setParams={this.handleRuleChange}
                        validationHandler={this.handleStepValidation}
                        currRule={this.state.rule.srcAddr}
                        details={this.props.details}
                        portFree={this.state.srcPortFree}
                    />
                );
            case 2:
                return (
                    <FilterForm
                        setParams={this.handleRuleChange}
                        validationHandler={this.handleStepValidation}
                        details={this.props.details}
                        currFilter={this.state.rule.filter}
                    />
                );
            case 3:
                return (
                    <AddressForm
                        whichForm="destAddr"
                        setParams={this.handleRuleChange}
                        validationHandler={this.handleStepValidation}
                        currRule={this.state.rule.destAddr}
                        details={this.props.details}
                        portFree={true}
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

    initForm = (form) => {
        this.setState((prevState) => {
            const newState = prevState;
            if (form === "name") {
                newState.rule.name = "";
            } else {
                // console.log(newState.rule[form]);
                const keys = Object.keys(newState.rule[form]);
                for (let i = 0; i < keys.length; i++) {
                    const currVal = newState.rule[form][keys[i]];
                    // console.log(currVal);
                    if (currVal === null) {
                        newState.rule[form][keys[i]] = "";
                    }
                }
            }
            return newState;
        });
    };

    setActiveStep = (newStep) => {
        this.setState({
            step: newStep,
            stepIsValid: false,
            // stepIsValid: true // DEBUG
        });
    };

    handleRuleChange = (value, field, form) => {
        this.setState((prevState, props) => {
            let currentRule = prevState.rule;
            let newRule = JSON.parse(JSON.stringify(currentRule));
            newRule[form][field] = value; 
            return({
            rule: newRule
            });
        });
    };

    handleRuleNameChange = (newName, form) => {
        let newRule = JSON.parse(JSON.stringify(this.state.rule));
        newRule[form] = newName;
        this.setState({rule: newRule});
    };

    totalSteps = () => {
        return getSteps().length;
    };

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

    handleStepValidation = (flag) => {
        // Set current step status, valid or not
        this.setState({stepIsValid: flag});
    };

    validateSourcePort = async () => {
        const port = this.state["rule"]["srcAddr"]["secondaryAddress"];
        const details = this.props.details;
        const portStatus = await BackendRequests.isPortFree(port, details["clusterName"], details["testOrProd"]);
        this.setState({srcPortFree: portStatus});
        return portStatus;
    };


    handleComplete = async () => {
        const currForm = stepsMap[this.state.step];
        let isValid = this.state.stepIsValid;

        if (this.state.step === 1 && this.state["rule"]["srcAddr"]["protocol"] === "http") {
            isValid = isValid &&  await this.validateSourcePort();
        }

        if (isValid === true) {
            let newCompleted = this.state.completed;
            newCompleted.push(this.state.step);
            this.setState({completed: newCompleted});
            if (this.state.completed.length !== this.totalSteps() - this.skippedSteps()) {
                this.handleNext();
            } else if (this.completedSteps() === this.totalSteps()) {
                this.handleFinish();
            }
        } else {
            this.initForm(currForm);
        }
    };

    handleFinish = (currForm) => {
        if (this.state.stepIsValid) {
            const rule = JSON.parse(JSON.stringify(this.state.rule));
            this.props.addRule(rule);
            this.props.validationHandler(true);
        } else {
            this.initForm(currForm);
        }
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
                    schemaContent: ""
                },
                slm: {
                    maxFileCount: null,
                    fileCountTimeUnit: null,
                    maxFileSize: null,
                    fileSizeUnit: null,
                    fileSizeTimeUnit: null,
                },
            },
        });
    };

    handleReset = () => {
        this.setActiveStep(0);
        this.setState({completed: []});
        this.setState({skipped: []});
        this.ruleReset();
    };

    isStepSkipped = (step) => {
        return this.state.skipped.includes(step);
    };

    isStepComplete = (step) => {
        return this.state.completed.includes(step);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Paper
                    elevation={3}
                    style={{marginBottom: "25px", marginTop: "25px"}}
                >
                    <Stepper alternativeLabel nonLinear activeStep={this.state.step}>
                        {this.steps.map((label, index) => {
                            const stepProps = {};
                            const buttonProps = {};

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

export default withStyles(useStyles, {withTheme: true})(HorizontalStepper);
