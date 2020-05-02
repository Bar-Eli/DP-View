import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {withStyles} from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import SimpleReactValidator from "simple-react-validator";
import Paper from "@material-ui/core/Paper";

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
    }
});

class SlmForm extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.state = {
            maxFileCount: this.props.currSlm.maxFileCount,
            maxFileSize: this.props.currSlm.maxFileSize
        };
        this.checkIfAllValid();
        this.validator.message("File Count", this.props.currSlm.maxFileCount, "integer");
        this.validator.message("File Size", this.props.currSlm.maxFileSize, "integer");


    }

    checkIfAllValid = () => {
        //Check if the validators were initialized, if so update valid props to true
        if (this.validator.allValid()) {
            this.props.validationHandler(true);
        } else this.props.validationHandler(false);
    };

    handleChange = (e, id) => {
        this.props.setParams(e.target.value, id, "slm");
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <form
                    className={classes.root} noValidate autoComplete="off">
                    <Paper elevation={3} style={{width: "fit-content", margin: "auto"}}>
                        <div className={classes.root}>
                            <TextField
                                label="Max files count"
                                value={this.state.maxFileCount}
                                onChange={e => {
                                    const val = parseInt(e.target.value);
                                    this.props.setParams(val, "maxFileCount", "slm");
                                    this.validator.message("File Count", e.target.value, "integer");
                                    this.setState({maxFileCount: e.target.value});
                                    this.checkIfAllValid();
                                }}
                                error={!this.validator.fieldValid("File Count") && this.props.currSlm.maxFileCount != null}
                                helperText={this.validator.getErrorMessages()["File Count"]}
                            />
                            <FormControl>
                                <InputLabel>Time Unit</InputLabel>
                                <Select
                                    onChange={e => {this.handleChange(e, "fileCountTimeUnit");}}
                                    value={this.props.currSlm.fileCountTimeUnit}
                                >
                                    <MenuItem value={1}>per second</MenuItem>
                                    <MenuItem value={60}>per minute</MenuItem>
                                    <MenuItem value={3600}>per hour</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Paper>

                    <br/>
                    <Paper elevation={3} style={{width: "fit-content", margin: "auto"}}>
                        <div className={classes.root}>
                            <TextField
                                label="Max file size"
                                value={this.state.maxFileSize}
                                onChange={e => {
                                    const val = parseInt(e.target.value);
                                    this.props.setParams(val, "maxFileSize", "slm");
                                    this.validator.message("File Size", e.target.value, "integer");
                                    this.setState({maxFileSize: e.target.value});
                                    this.checkIfAllValid();
                                }}
                                error={!this.validator.fieldValid("File Size") && this.props.currSlm.maxFileSize != null}
                                helperText={this.validator.getErrorMessages()["File Size"]}
                            />
                            <FormControl>
                                <InputLabel>Size Unit</InputLabel>
                                <Select
                                    onChange={e => {this.handleChange(e, "fileSizeUnit");}}
                                    value={this.props.currSlm.fileSizeUnit}
                                >
                                    <MenuItem value={"kb"}>KB</MenuItem>
                                    <MenuItem value={"mb"}>MB</MenuItem>
                                    <MenuItem value={"gb"}>GB</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel>Time Unit</InputLabel>
                                <Select
                                    onChange={e => {this.handleChange(e, "fileSizeTimeUnit");}}
                                    value={this.props.currSlm.fileSizeTimeUnit}
                                >
                                    <MenuItem value={1}>per second</MenuItem>
                                    <MenuItem value={60}>per minute</MenuItem>
                                    <MenuItem value={3600}>per hour</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Paper>
                </form>
            </div>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(SlmForm);
