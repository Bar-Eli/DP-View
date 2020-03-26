import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class NameForm extends Component {
  render() {
    return (
      <div>
        <TextField
          id="rule-name"
          label="Rule Name..."
          value={this.props.ruleName}
          onChange={e => this.props.updateRuleName(e.target.value, "name")}
        />
      </div>
    );
  }
}
