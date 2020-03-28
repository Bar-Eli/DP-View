import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
        textAlign: "left",
    },
    methodLabel: {
        marginBottom: "5px",
        marginTop: "0"
    }
});

class AddressForm extends Component {
    constructor(props) {
        super(props);
        // verify if form is complete somehow
        this.state = {
            httpBtnColor: "default",
            mqBtnColor: "default",
            network: undefined,
            protocol: "http",
            primaryAddress: "IP / URL",
            secondaryAddress: "Port",
            showMethods: "block",
            methodList: ["POST", "PUT", "GET"],
            checkedValues: {"POST": false, "PUT": false, "GET": false}
        };

      this.props.setParams("http", "protocol", this.props.whichForm); // Default protocol
    }

    httpBtnClick = () => {
        this.setState({
            httpBtnColor: "primary",
            mqBtnColor: "default",
            showMethods: "block",
            primaryAddress: "IP / URL",
            secondaryAddress: "Port"
        });
        this.props.setParams("http", "protocol", this.props.whichForm);
    };

    mqBtnClick = () => {
        this.setState({
            mqBtnColor: "primary",
            httpBtnColor: "default",
            showMethods: "none",
            primaryAddress: "Queue manager",
            secondaryAddress: "Queue name"
        });
        this.props.setParams("mq", "protocol", this.props.whichForm);
    };

    handleChangeNetwork = event => {
        // setAge(event.target.value);
        this.props.setParams(event.target.value, "network", this.props.whichForm);
    };

    handleCheckMethod(method) {
        /*
        this.setState(state => ({
          checkedValues: state.checkedValues.includes(method)
            ? state.checkedValues.filter(c => c !== method)
            : [...state.checkedValues, method]
        }));
        */
        let newChecked = JSON.parse(JSON.stringify(this.state.checkedValues));
        newChecked[method] = !newChecked[method];
        // newChecked[method] = true;
        this.setState({checkedValues: newChecked});
        let newMethods = [];
        for (const method in newChecked) {
            if (newChecked[method]) {
                newMethods.push(method);
            }
        }
        this.props.setParams(
            newMethods.slice(),
            "methods",
            this.props.whichForm
        );
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <br/>
                    <h5 className={classes.center}>Protocol</h5>

                    <Button
                        variant="contained"
                        color={this.state.httpBtnColor}
                        onClick={this.httpBtnClick}
                    >
                        http
                    </Button>
                    <Button
                        variant="contained"
                        color={this.state.mqBtnColor}
                        onClick={this.mqBtnClick}
                    >
                        mq
                    </Button>
                    <br/>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Network</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.age}
                            onChange={this.handleChangeNetwork}
                        >
                            <MenuItem value={"Salim"}>Salim</MenuItem>
                            <MenuItem value={"Tzadok"}>Tzadok</MenuItem>
                            <MenuItem value={"Zeus"}>Zeus</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="primary-address"
                        label={this.state.primaryAddress}
                        onChange={e => {
                            this.props.setParams(
                                e.target.value,
                                "primaryAddress",
                                this.props.whichForm
                            );
                        }}
                    />
                    <TextField
                        id="secondary-address"
                        label={this.state.secondaryAddress}
                        onChange={e => {
                            this.props.setParams(
                                e.target.value,
                                "secondaryAddress",
                                this.props.whichForm
                            );
                        }}
                    />
                    <br/>
                    <br/>
                    <div className={classes.centerMargin}
                        style={{display: this.state.showMethods}}
                    >
                        <h5 className={classes.methodLabel}>Method</h5>
                        {this.state.methodList.map(method => (
                            <div>
                                <FormControlLabel
                                    value={method}
                                    control={<Checkbox/>}
                                    label={method}
                                    checked={this.state.checkedValues[method]}
                                    onChange={() => this.handleCheckMethod(method)}
                                />
                            </div>
                        ))}
                    </div>
                </form>
                <br/>
                <br/>
            </div>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(AddressForm);
