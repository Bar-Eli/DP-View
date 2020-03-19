import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { grey } from "@material-ui/core/colors";

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
    margin: "auto"
  }
});

class FilterFormForm extends Component {
  constructor(props) {
    super(props);
    // verify if form is complete somehow
    this.state = {
      greenBtnBackground: "#e0e0e0",
      greenBtnColor: "default",
      schemaBtnColor: "default",
      dpasBtnColor: "default",
      dpasService: undefined,
      showDpas: "none",
      showUpload: "none"
    };
  }

  schemaBtnClick = () => {
    this.setState({
      greenBtnColor: "default",
      schemaBtnColor: "primary",
      dpasBtnColor: "default",
      greenBtnBackground: "#e0e0e0",
      showDpas: "none",
      showUpload: "inline-flex"
    });
  };

  dpasBtnClick = () => {
    this.setState({
      greenBtnColor: "default",
      schemaBtnColor: "default",
      dpasBtnColor: "primary",
      greenBtnBackground: "#e0e0e0",
      showDpas: "inline-flex",
      showUpload: "none"
    });
  };

  handleChangeDpas = event => {
    this.setState({ dpasService: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <br />

          <Button
            variant="contained"
            color={this.state.greenBtnColor}
            style={{ background: this.state.greenBtnBackground }}
            onClick={this.props.updateParams("green", "filterType", "filter")}
          >
            Green Route
          </Button>
          <Button
            variant="contained"
            color={this.state.schemaBtnColor}
            onClick={this.schemaBtnClick}
          >
            Schema
          </Button>
          <Button
            variant="contained"
            color={this.state.dpasBtnColor}
            onClick={this.dpasBtnClick}
          >
            DPAS
          </Button>
          <br />
          <FormControl style={{ display: this.state.showDpas }}>
            <InputLabel id="demo-simple-select-label">DPAS service</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.dpasService}
              onChange={this.handleChangeDpas}
            >
              <MenuItem value={"Salim"}>Dexter</MenuItem>
              <MenuItem value={"Tzadok"}>Nimbus</MenuItem>
              <MenuItem value={"Zeus"}>Tsadok</MenuItem>
            </Select>
          </FormControl>

          <br />
          <div
            className={classes.centerMargin}
            style={{ display: this.state.showUpload }}
          >
            <br />
            <input
              accept="text/xml,application/json,text/xsl,text/xsd"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
          </div>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(FilterFormForm);
