import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import SimpleReactValidator from "simple-react-validator";

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
    this.checkIfAllValid();
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
    return (
      <div>
        <form>
          <div>
            <TextField
              label="Max files count"
              value={this.props.currSlm.maxFileCount}
              style={{ marginRight: "100px", paddingTop: "20px" }}
              onChange={e => {
                const val = parseInt(e.target.value);
                this.props.setParams(val, "maxFileCount", "slm");
                this.validator.message("File Count", e.target.value, "integer");
                this.checkIfAllValid();
              }}
              error={
                !this.validator.fieldValid("File Count") &&
                this.props.currSlm.maxFileCount != null
              }
              helperText={this.validator.getErrorMessages()["File Count"]}
            />
            <FormControl
            style={{minWidth: "200px"}}>
              <InputLabel
                id="demo-simple-select-label"
              >
                Time Unit
              </InputLabel>
              <Select
                style={{ paddingBottom: "20px" }}
                labelId="demo-simple-select-label"
                onChange={e => { this.handleChange(e, "fileCountTimeUnit"); }}>
                <MenuItem value={1}>per second</MenuItem>
                <MenuItem value={60}>per minute</MenuItem>
                <MenuItem value={3600}>per hour</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <TextField
              label="Max file size"
              value={this.props.currSlm.maxFileSize}
              style={{ marginRight: "100px", paddingTop: "20px" }}
              onChange={e => {
                const val = parseInt(e.target.value);
                this.props.setParams(val, "maxFileSize", "slm");
                // this.handleChange(e, "maxFileSize");
                this.validator.message("File Size", e.target.value, "integer");
                this.checkIfAllValid();
              }}
              error={
                !this.validator.fieldValid("File Size") &&
                this.props.currSlm.maxFileSize != null
              }
              helperText={this.validator.getErrorMessages()["File Size"]}
            />
            <FormControl style={{ paddingRight: "100px", minWidth: "200px" }}>
              <InputLabel id="demo-simple-select-label2">Size Unit</InputLabel>
              <Select
                style={{
                  paddingBottom: "20px"
                }}
                labelId="demo-simple-select-labe2"
                onChange={e => { this.handleChange(e, "fileSizeUnit"); }}>
                <MenuItem value={"kb"}>KB</MenuItem>
                <MenuItem value={"mb"}>MB</MenuItem>
                <MenuItem value={"gb"}>GB</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Time Unit</InputLabel>
              <Select
                style={{ paddingBottom: "20px", minWidth: "200px" }}
                labelId="demo-simple-select-label"
                onChange={e => { this.handleChange(e, "fileSizeTimeUnit"); }} >
                <MenuItem value={1}>per second</MenuItem>
                <MenuItem value={60}>per minute</MenuItem>
                <MenuItem value={3600}>per hour</MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(SlmForm);
