import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SimpleReactValidator from 'simple-react-validator';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import BackendRequests from "../../../BackendHandlers/BackendRequests";

const useStyles = theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: 200

        }
    }
});

class DetailsForm extends Component {
    constructor(props) {
        super(props);
        // add environment as variable?
        this.state = {
            testBtnColor: this.props.details.testOrProd === 'test' ? "primary" : "default",
            prodBtnColor: this.props.details.testOrProd === 'prod' ? "primary" : "default",
            clusters: [],
        };
        this.getClusters(); // Assign clusters to select form.
        this.validator = new SimpleReactValidator();
        this.validator.message('Project Name', this.props.details.projectNameValue, 'required');
        this.validator.message('Mador', this.props.details.projectMadorValue, 'required');
        this.validator.message('Team', this.props.details.projectTeamValue, 'required');
        this.validator.message('btn', 'test', 'required');
        this.checkIfAllValid();
    }

    checkIfAllValid = () => {
        //Check if the validators were initialized, if so update valid props to true
        if (this.validator.allValid()) {
            this.props.validationHandler(true);
        } else
            this.props.validationHandler(false);
    };

    testBtnClick = () => {
        this.setState({testBtnColor: "primary", prodBtnColor: "default"});
        this.props.updateParams("test", "testOrProd", "details");
        this.validator.message('btn', 'test', 'required')
        this.checkIfAllValid();

        this.getClusters();
    };

    prodBtnClick = () => {
        this.setState({prodBtnColor: "primary", testBtnColor: "default"});
        this.props.updateParams("prod", "testOrProd", "details");
        this.validator.message('btn', 'prod', 'required')
        this.checkIfAllValid();
    };

     getClusters = async () => {
        const clustersList = await BackendRequests.getClustersNames();
        this.setState({clusters: clustersList});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="project-name"
                        label="Project Name"
                        value={this.props.details.projectNameValue}
                        onChange={e => {
                            this.props.updateParams(
                                e.target.value,
                                "projectNameValue",
                                "details"
                            );
                            this.validator.message('Project Name', e.target.value, 'required');
                            this.checkIfAllValid();
                        }
                        }
                        error={!this.validator.fieldValid('Project Name') && this.props.details.projectNameValue != null}
                        helperText={this.validator.getErrorMessages()["Project Name"]}
                    />
                    <TextField
                        id="project-mador"
                        label="Mador"
                        value={this.props.details.projectMadorValue}
                        onChange={e => {
                            this.props.updateParams(
                                e.target.value,
                                "projectMadorValue",
                                "details"
                            );
                            this.validator.message('Mador', e.target.value, 'required');
                            this.checkIfAllValid();
                        }
                        }
                        error={!this.validator.fieldValid('Mador') && this.props.details.projectMadorValue != null}
                        helperText={this.validator.getErrorMessages()["Mador"]}
                    />
                    <TextField
                        id="project-team"
                        label="Team"
                        value={this.props.details.projectTeamValue}
                        onChange={e => {
                            this.props.updateParams(
                                e.target.value,
                                "projectTeamValue",
                                "details"
                            );
                            this.validator.message('Team', e.target.value, 'required');
                            this.checkIfAllValid();
                        }
                        }
                        error={!this.validator.fieldValid('Team') && this.props.details.projectTeamValue != null}
                        helperText={this.validator.getErrorMessages()["Team"]}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SupervisedUserCircle/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <br/>

                    <Button
                        variant="contained"
                        color={this.state.testBtnColor}
                        onClick={this.testBtnClick}
                    >
                        Test
                    </Button>
                    <Button
                        variant="contained"
                        color={this.state.prodBtnColor}
                        onClick={this.prodBtnClick}
                    >
                        Prod
                    </Button>
                    <br/>

                    <Autocomplete
                        id="environment"
                        options={this.state.clusters}
                        getOptionLabel={clustersList => clustersList}
                        // style={{width: 300}}
                        renderInput={params => (
                            <TextField {...params} label="Cluster" variant="outlined"/>
                        )}
                        onChange={(e, value) => {
                            this.setState({displayMpgwSelection: "inline-flex"});
                            this.setState({displayButtons: "inline-block"});
                        }}
                    />

                </form>
                <br/>
                <br/>
            </div>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(DetailsForm);
