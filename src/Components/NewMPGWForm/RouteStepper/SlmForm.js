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

    this.validator.message(
      "File Count",
      this.props.currSlm.maxFileCount,
      "required"
    );
    this.validator.message(
      "File Size",
      this.props.currSlm.maxFileSize,
      "required"
    );
    this.validator.message(
      "Size Unit",
      this.props.currSlm.fileSizeUnit,
      "required"
    );
    this.validator.message(
      "Size Time Unit",
      this.props.currSlm.fileSizeTimeUnit,
      "required"
    );
    this.validator.message(
      "Count Time Unit",
      this.props.currSlm.fileCountTimeUnit,
      "required"
    );

    this.checkIfAllValid();
  }

  checkIfAllValid = () => {
    //Check if the validators were initialized, if so update valid props to true
    if (this.validator.allValid()) {
      this.props.validationHandler(true);
    } else this.props.validationHandler(false);
  };

  handleChangeTimeUnit = e => {
    this.props.setParams(e.target.value, "fileCountTimeUnit", "slm");
  };

  handleChangeSizeUnit = e => {
    this.props.setParams(e.target.value, "fileSizeUnit", "slm");
  };

  handleCountInput = e => {
    this.props.setParams(e.target.value, "maxFileCount", "slm");
  };

  handleSizeInput = e => {
    this.props.setParams(e.target.value, "maxFileSize", "slm");
  };

  handleSizeTimeInput = e => {
    this.props.setParams(e.target.value, "fileSizeTimeUnit", "slm");
  };

  render() {
    return (
      <div>
        <form>
          <div>
            <TextField
              label="Max files count..."
              value={this.props.currSlm.maxFileCount}
              style={{ marginRight: "100px", paddingTop: "20px" }}
              onChange={e => {
                this.handleCountInput(e);

                this.validator.message(
                  "File Count",
                  e.target.value,
                  "required|integer"
                );
                this.checkIfAllValid();
              }}
              error={
                !this.validator.fieldValid("File Count") &&
                this.props.currSlm.maxFileCount != null
              }
              helperText={this.validator.getErrorMessages()["File Count"]}
            ></TextField>
            <FormControl>
              <InputLabel
                // style={{ paddingLeft: "20px", paddingRight: "20px" }}
                id="demo-simple-select-label"
              >
                Time Unit
              </InputLabel>
              <Select
                style={{ width: "200%", paddingBottom: "20px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={e => {
                  this.handleChangeTimeUnit(e);

                  this.validator.message(
                    "Count Time Unit",
                    e.target.value,
                    "required"
                  );
                  this.checkIfAllValid();
                }}
              >
                <MenuItem value={"minute"}>per minute</MenuItem>
                <MenuItem value={"hour"}>per hour</MenuItem>
                <MenuItem value={"day"}>per day</MenuItem>
              </Select>
              <FormHelperText
                error={
                  !this.validator.fieldValid("Count Time Unit") &&
                  this.props.currSlm.fileCountTimeUnit != null
                }
              >
                the time unit field is required.
              </FormHelperText>
            </FormControl>
          </div>

          <br />

          <div>
            <TextField
              label="Max file size..."
              value={this.props.currSlm.maxFileSize}
              style={{ marginRight: "100px", paddingTop: "20px" }}
              onChange={e => {
                this.handleSizeInput(e);

                this.validator.message(
                  "File Size",
                  e.target.value,
                  "required|integer"
                );
                this.checkIfAllValid();
              }}
              error={
                !this.validator.fieldValid("File Size") &&
                this.props.currSlm.maxFileSize != null
              }
              helperText={this.validator.getErrorMessages()["File Size"]}
            ></TextField>
            <FormControl style={{ paddingRight: "250px" }}>
              <InputLabel id="demo-simple-select-label2">Size Unit</InputLabel>
              <Select
                style={{
                  width: "200%",
                  paddingBottom: "20px"
                }}
                labelId="demo-simple-select-labe2"
                id="demo-simple-select2"
                onChange={e => {
                  this.handleChangeSizeUnit(e);

                  this.validator.message(
                    "Size Unit",
                    e.target.value,
                    "required"
                  );
                  this.checkIfAllValid();
                }}
              >
                <MenuItem value={"kb"}>KB</MenuItem>
                <MenuItem value={"mb"}>MB</MenuItem>
                <MenuItem value={"gb"}>GB</MenuItem>
              </Select>
              <FormHelperText
                error={
                  !this.validator.fieldValid("Size Unit") &&
                  this.props.currSlm.fileSizeUnit != null
                }
              >
                the size unit field is required.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Time Unit</InputLabel>
              <Select
                style={{ width: "200%", paddingBottom: "20px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={e => {
                  this.handleSizeTimeInput(e);

                  this.validator.message(
                    "Size Time Unit",
                    e.target.value,
                    "required"
                  );
                  this.checkIfAllValid();
                }}
              >
                <MenuItem value={"minute"}>per minute</MenuItem>
                <MenuItem value={"hour"}>per hour</MenuItem>
                <MenuItem value={"day"}>per day</MenuItem>
              </Select>
              <FormHelperText
                error={
                  !this.validator.fieldValid("Size Time Unit") &&
                  this.props.currSlm.fileSizeTimeUnit != null
                }
              >
                the time unit field is required.
              </FormHelperText>
            </FormControl>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(SlmForm);
