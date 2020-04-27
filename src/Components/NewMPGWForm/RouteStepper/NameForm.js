import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import SimpleReactValidator from "simple-react-validator";

export default class NameForm extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator();

    this.validator.message("Name", this.props.ruleName, "required");
    this.checkIfAllValid();
  }

  checkIfAllValid = () => {
    //Check if the validators were initialized, if so update valid props to true
    if (this.validator.allValid()) {
      this.props.validationHandler(true);
    } else this.props.validationHandler(false);
  };

  render() {
    return (
      <div>
        <TextField
          id="rule-name"
          label="Rule Name..."
          value={this.props.ruleName}
          defaultValue={this.props.ruleName}
          // variant="outlined"
          onChange={e => {
            this.props.updateRuleName(e.target.value, "name");
            this.validator.message("Name", e.target.value, "required");
            this.checkIfAllValid();
          }}
          error={
            !this.validator.fieldValid("Name") && this.props.ruleName != null
          }
          helperText={this.validator.getErrorMessages()["Name"]}

        />
      </div>
    );
  }
}
