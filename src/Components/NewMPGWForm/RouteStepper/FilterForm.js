import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Radio from "@material-ui/core/Radio";
// import { grey } from "@material-ui/core/colors";

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
      greenBtnBackground: "default",
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
    this.props.setParams("schema", "filterType", "filter");
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
    this.props.setParams("dpass", "filterType", "filter");
  };

  // greenBtnClick = () => {
  //   this.setState({
  //     greenBtnColor: "primary",
  //     schemaBtnColor: "default",
  //     dpasBtnColor: "default",
  //     greenBtnBackground: "green",
  //     showDpas: "none",
  //     showUpload: "none"
  //   });
  //   this.props.updateParams("green", "filterType", "filter");
  // };

  handleChangeDpas = event => {
    // this.props.updateParams("dexter", "filterType", "filter");
    // this.props.updateParams(event.target.value, "dexterFilter", "filter");
    this.props.setParams(event.target.value, "dpasFilter", "filter");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <br />

          {/* <Button
            variant="contained"
            color={this.state.greenBtnColor}
            style={{ background: this.state.greenBtnBackground }}
            onClick={this.greenBtnClick}
          >
            Green Route
          </Button> */}
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
              <MenuItem value={"Salim"}>Salim</MenuItem>
              <MenuItem value={"Tzadok"}>Tzadok</MenuItem>
              <MenuItem value={"Nimbus"}>Nimbus</MenuItem>
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
