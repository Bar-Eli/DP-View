import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import MaterialTable from "material-table";

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
        display: "block"
    }
});

const collums = [
    {title: "Network", field: "Network"},
    {title: "Ip/Url", field: "Url"},
    {title: "Ip/Url", field: "Url"}
];

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
            httpMethod: undefined,
            showMethods: "block"
        };
    }

    httpBtnClick = () => {
        this.setState({
            httpBtnColor: "primary",
            mqBtnColor: "default",
            showMethods: "block",
            primaryAddress: "IP / URL",
            secondaryAddress: "Port"
        });
        this.props.updateParams("http", "protocol", this.props.whichForm);
    };

    mqBtnClick = () => {
        this.setState({
            mqBtnColor: "primary",
            httpBtnColor: "default",
            showMethods: "none",
            primaryAddress: "Queue manager",
            secondaryAddress: "Queue name"
        });
        this.props.updateParams("mq", "protocol", this.props.whichForm);
    };

    handleChangeHttpMethod = event => {
        // setAge(event.target.value);
        this.setState({httpMethod: event.target.value});
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
                    {/* <div style={{ maxWidth: "100%" }}>
            <MaterialTable></MaterialTable>
          </div> */}
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Network</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.age}
                            onChange={e =>
                                this.props.updateParams(
                                    e.target.value,
                                    "network",
                                    this.props.whichForm
                                )
                            }
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
                            this.props.updateParams(
                                e.target.value,
                                "primaryAddress",
                                this.props.whichForm
                            );
                        }}
                        value={this.props.params.primaryAddress}
                    />
                    <TextField
                        id="secondary-address"
                        label={this.state.secondaryAddress}
                        onChange={e => {
                            this.props.updateParams(
                                e.target.value,
                                "secondaryAddress",
                                this.props.whichForm
                            );
                        }}
                        value={this.props.params.secondaryAddress}
                    />
                    <br/>
                    <br/>
                    <div
                        style={{display: this.state.showMethods}}
                    >
                        <h5 className={classes.centerMargin}>Method</h5>
                        <RadioGroup
                            aria-label="httpMethod"
                            name="httpMethod"
                            onChange={e => {
                                this.props.updateParams(
                                    e.target.value,
                                    "method",
                                    this.props.whichForm
                                );
                            }}
                            value={this.props.params.method}
                        >
                            <FormControlLabel value="GET" control={<Radio/>} label="GET"/>
                            <FormControlLabel value="POST" control={<Radio/>} label="POST"/>
                            <FormControlLabel value="PUT" control={<Radio/>} label="PUT"/>
                        </RadioGroup>
                    </div>
                </form>
                <br/>
                <br/>
            </div>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(AddressForm);
