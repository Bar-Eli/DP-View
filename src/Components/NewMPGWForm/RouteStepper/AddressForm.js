import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SimpleReactValidator from "simple-react-validator";
import BackendRequests from "../../../BackendHandlers/BackendRequests";

const useStyles = theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: 200
        }
    },
    center: {
        width: "auto"
    },
    centerMargin: {
        margin: "auto",
        marginBlockEnd: "auto",
        display: "block",
        textAlign: "left"
    },
    methodLabel: {
        marginBottom: "5px",
        marginTop: "0"
    },
    mqOptions: {
        width: "auto",
        padding: "10px",
    }
});

class AddressForm extends Component {
    constructor(props) {
        super(props);
        // verify if form is complete somehow
        this.state = {
            httpBtnColor: "primary",
            mqBtnColor: "default",
            network: undefined,
            protocol: "http",
            primaryAddress: "IP / URL",
            secondaryAddress: "Port",
            showMethods: "block",
            methodList: ["POST", "PUT", "GET"],
            checkedValues: {POST: false, PUT: false, GET: false},
            networks: [],
            vips: [],
            mqOptions: "env",
            mqEnvironments: [],
            mqManagers: []
        };

        this.assignClusterDetails().then();
        this.initValidator();

        this.props.setParams("http", "protocol", this.props.whichForm); // Default protocol
    }

    initValidator = () => {
        this.validator = new SimpleReactValidator();
        this.validator.message("Primary Address", this.props.currRule.primaryAddress, "required");
        this.validator.message("Secondary Address", this.props.currRule.secondaryAddress, "required");
        this.validator.message("Network", this.props.currRule.network, "required");
        // this.validator.message("Method", this.props.currRule.network, "required");

        this.checkIfAllValid();

        if (this.props.whichForm === "destAddr") {
            this.props.validationHandler(false);
        }
    };

    assignClusterDetails = async () => {
        const details = this.props.details;
        const clusterDetalis = await BackendRequests.getClusterDetailsByClusterName(details["clusterName"], details["testOrProd"]);
        this.setState({networks: Object.keys(clusterDetalis["vips"])});
        this.setState({vips: Object.values(clusterDetalis["vips"])});
        const mqEnv = await BackendRequests.getMqEnvironments(details["clusterName"], details["testOrProd"]);
        const mqMgr = await BackendRequests.getMqManagers(details["clusterName"], details["testOrProd"]);
        this.setState({mqEnvironments: Object.keys(mqEnv), mqManagers: mqMgr});
    };

    checkIfAllValid = () => {
        //Check if the validators were initialized, if so update valid props to true
        if (this.validator.allValid()) {
            this.props.validationHandler(true);
        } else this.props.validationHandler(false);
    };

    httpBtnClick = () => {
        this.setState({
            httpBtnColor: "primary",
            mqBtnColor: "default",
            showMethods: "block",
            primaryAddress: "IP / URL",
            secondaryAddress: "Port",
            protocol: "http"
        });
        this.props.setParams("http", "protocol", this.props.whichForm);
    };

    mqBtnClick = () => {
        this.setState({
            mqBtnColor: "primary",
            httpBtnColor: "default",
            showMethods: "none",
            primaryAddress: "Queue manager",
            secondaryAddress: "Queue name",
            protocol: "mq"
        });
        this.props.setParams("mq", "protocol", this.props.whichForm);
    };

    handleChangeNetwork = event => {
        this.props.setParams(event.target.value, "network", this.props.whichForm);
        this.validator.message("Network", event.target.value, "required");
        this.checkIfAllValid();
    };

    handleChangePrimary = event => {
        this.props.setParams(event.target.value, "primaryAddress", this.props.whichForm);
        if (this.state.protocol === "http") {
            this.validator.message("Primary Address", event.target.value, "required");
        } else if (this.state.protocol === "mq") {
            this.validator.message("Primary Address", event.target.value, "required");
        }
        this.checkIfAllValid();
    };

    handleChangeSecondary = e => {
        this.props.setParams(
            e.target.value,
            "secondaryAddress",
            this.props.whichForm
        );
        if (this.state.httpBtnColor === "primary") {
            this.validator.message(
                "Secondary Address",
                e.target.value,
                "required|integer"
            );
        } else if (this.state.mqBtnColor === "primary") {
            this.validator.message(
                "Secondary Address",
                e.target.value,
                "required"
            );
        }
        this.checkIfAllValid();
    };

    handleCheckMethod(method) {
        let newChecked = JSON.parse(JSON.stringify(this.state.checkedValues));
        newChecked[method] = !newChecked[method];
        this.setState({checkedValues: newChecked});
        let newMethods = [];
        for (const method in newChecked) {
            if (newChecked[method]) {
                newMethods.push(method);
            }
        }
        this.props.setParams(newMethods.slice(), "methods", this.props.whichForm);
    }

    renderPrimaryOptions = () => {
        const mqOptions = this.state.mqOptions === "env" ? this.state.mqEnvironments : this.state.mqManagers;
        const options = this.state.protocol === "http" ? this.state.vips : mqOptions;
        return options.map((el) => {
            return <MenuItem value={el}>{el}</MenuItem>;
        })
    };

    renderNetworks = () => {
        return (
            <FormControl>
                <InputLabel id="demo-simple-select-label">Network</InputLabel>
                <Select onChange={e => {
                    this.handleChangeNetwork(e);
                }}>
                    {this.state.networks.map((el) => {
                        return <MenuItem value={el}>{el}</MenuItem>;
                    })}
                </Select>
                <FormHelperText
                    error={
                        !this.validator.fieldValid("Network") &&
                        this.props.currRule.network != null
                    }
                >
                    the network field is required.
                </FormHelperText>
            </FormControl>
        );
    };

    renderMqOptions = () => {
        const {classes} = this.props;
        const variants = {
            environment: this.state.mqOptions === "env" ? "primary" : "default",
            manager: this.state.mqOptions === "mgr" ? "primary" : "default"
        };
        return (
            <ButtonGroup className={classes.mqOptions} size="small" color="primary" orientation="vertical"
                         aria-label="primary button group">
                <Button variant="contained" color={variants["environment"]}
                        onClick={() => this.setState({mqOptions: "env"})}>Environment</Button>
                <Button variant="contained" color={variants["manager"]}
                        onClick={() => this.setState({mqOptions: "mgr"})}>MQ manager</Button>
            </ButtonGroup>
        )

    };

    renderPrimarySelect = () => {
        return (
            <FormControl>
                <InputLabel>{this.state.primaryAddress}</InputLabel>
                <Select onChange={e => {
                    this.handleChangePrimary(e);
                }}>
                    {this.renderPrimaryOptions()}
                </Select>
                <FormHelperText
                    error={
                        !this.validator.fieldValid("Primary Address") &&
                        this.props.currRule.network != null
                    }
                >
                    the {this.state.primaryAddress} field is required.
                </FormHelperText>
            </FormControl>
        );
    };

    renderPrimaryText = () => {
        return (
            <TextField id="primary-address" label={this.state.primaryAddress}
                       onChange={e => {
                           this.handleChangePrimary(e)
                       }}
                       error={
                           !this.validator.fieldValid("Primary Address") &&
                           this.props.currRule.primaryAddress != null
                       }
                       helperText={this.validator.getErrorMessages()["Primary Address"]}
            />
        );
    };

    renderPrimary = () => {
        if (this.state.protocol === "mq") {
            return [this.renderMqOptions(), this.renderPrimarySelect()]
        }
        if (this.state.protocol === "http" && this.props.whichForm === "srcAddr") {
            return this.renderPrimarySelect();
        }
        return this.renderPrimaryText();
    };

    renderSecondary = () => {
        return (
            <TextField
                id="secondary-address"
                label={this.state.secondaryAddress}
                onChange={e => {
                    this.handleChangeSecondary(e);
                }}
                error={
                    !this.validator.fieldValid("Secondary Address") &&
                    this.props.currRule.primaryAddress != null
                }
                helperText={this.validator.getErrorMessages()["Secondary Address"]}
            />
        );
    };

    renderMethods = () => {
        const {classes} = this.props;
        return (
            <div className={classes.centerMargin} style={{display: this.state.showMethods}}>
                <h5 className={classes.methodLabel}>Method</h5>
                {this.state.methodList.map(method => (
                    <div>
                        <FormControlLabel value={method} control={<Checkbox/>} label={method}
                                          checked={this.state.checkedValues[method]}
                                          onChange={() => {
                                              this.handleCheckMethod(method);
                                              this.setState({wasMethodListTouched: true});
                                          }}
                                          required={true}
                        />
                    </div>
                ))}
                <FormHelperText>the method field is required.</FormHelperText>
            </div>
        );
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <br/>
                    <h5 className={classes.center}>Protocol</h5>

                    <Button variant="contained" color={this.state.httpBtnColor}
                            onClick={this.httpBtnClick}>http</Button>
                    <Button variant="contained" color={this.state.mqBtnColor} onClick={this.mqBtnClick}>mq</Button>
                    <br/>

                    {this.renderNetworks()}
                    {this.renderPrimary()}
                    {this.renderSecondary()}

                    <br/>
                    <br/>
                    {this.renderMethods()}
                </form>
                <br/>
                <br/>
            </div>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(AddressForm);
