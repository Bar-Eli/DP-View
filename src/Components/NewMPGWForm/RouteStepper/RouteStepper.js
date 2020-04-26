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
import DpCredsPopup from "../../DpCredsPopup";
import RuleTable from "../../RuleTable";
import BackendRequests from "../../../BackendHandlers/BackendRequests";

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
    return ["Route details", "Rules", "Overview"];
}

class RouteStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsFormTouched: false,
            projectNameTaken: false,
            popUpStatus: false,
            stepIsValid: false,
            step: 0,
            // step: 1, // DEBUG
            params: {
                details: {
                    projectNameValue: "",
                    projectMadorValue: "",
                    projectTeamValue: "",
                    clusterName: "",
                    testOrProd: "test",
                },
                rules: [],
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

    addRule = (rule) => {
        let newParams = JSON.parse(JSON.stringify(this.state.params));
        newParams["rules"].push(rule);
        this.setState({ params: newParams });
    };

    removeRule = (index) => {
        let newParams = JSON.parse(JSON.stringify(this.state.params));
        newParams["rules"].splice(index, 1);
        this.setState({ params: newParams });
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <DetailsForm
                        details={this.state.params.details}
                        updateParams={this.updateParamState}
                        validationHandler={this.handleStepValidation}
                        detailsFormTouched={this.state.detailsFormTouched}
                        nameTaken={this.state.projectNameTaken}
                    />
                );
            case 1:
                return (
                    <HorizontalStepper
                        validationHandler={this.handleStepValidation}
                        addRule={this.addRule}
                        details={this.state.params.details}
                    />
                );
            case 2:
                return (
                    //<Overview/>
                    <RuleTable data={this.state.params} removeRule={this.removeRule} />
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
        // this.setState({ stepIsValid: true }); // DEBUG
    };

    detailsFormWasTouched = () => {
        this.setState({ detailsFormTouched: true });
    };

    handleNext = async () => {
        // Handle a press on the next button
        let valid = this.state.stepIsValid;
        if (valid && this.state.step === 0) {
            this.props.setClusterName(this.state.params.details.clusterName, this.state.params.details.testOrProd);
            const details = this.state["params"]["details"];
            const mpgwTaken = await BackendRequests.isMpgwExsists(details["projectNameValue"], details["clusterName"], details["testOrProd"]);
            this.setState({projectNameTaken: mpgwTaken});
            valid = valid && !mpgwTaken;
        }
        if (valid) {
            this.setActiveStep(this.state.step + 1);
        } else {
            this.detailsFormWasTouched();
        }
    };

    handleBack = () => {
        // Handle a press on the back button
        this.setActiveStep(this.state.step - 1);
    };

    handleFinish = () => {
        // Handle a press on the finish button
        this.setState({ popUpStatus: true });
    };

    handleNextStepForFinish = () => {
        this.setActiveStep(this.state.step + 1);
        const newMpgwParams = JSON.parse(JSON.stringify(this.state["params"]));
        // This is the json with the params that should be sent to the backend
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
                                        <DpCredsPopup
                                            status={this.state.popUpStatus}
                                            handleClose={this.handlePopUpClose}
                                            updateParams={this.updateParamState}
                                            credentials={this.state.params.dpCredentials}
                                            nextStep={this.handleNextStepForFinish}
                                        />
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
