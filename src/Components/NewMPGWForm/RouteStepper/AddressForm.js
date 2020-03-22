import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
import DynamicTable from "../../DynamicTable";

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
      showMethods: "block",
      srcTableData: [],
      destTableData: [],
      showTableMQ: "false"
    };
  }

  httpBtnClick = () => {
    this.setState({
      httpBtnColor: "primary",
      mqBtnColor: "default",
      showMethods: "block",
      primaryAddress: "IP / URL",
      secondaryAddress: "Port",
      showTableMQ: "false"
    });
    this.props.updateParams("http", "protocol", this.props.whichForm);
  };

  mqBtnClick = () => {
    this.setState({
      mqBtnColor: "primary",
      httpBtnColor: "default",
      showMethods: "none",
      primaryAddress: "Queue manager",
      secondaryAddress: "Queue name",
      showTableMQ: "true"
    });
    this.props.updateParams("mq", "protocol", this.props.whichForm);
  };

  handleChangeHttpMethod = event => {
    // setAge(event.target.value);
    this.setState({ httpMethod: event.target.value });
  };

  handleRowAdd = (newData, isSrc) => {
    if (isSrc === "true") {
      this.setState(prevState => {
        const srcTableData = [...prevState.srcTableData];
        srcTableData.push(newData);
        return { ...prevState, srcTableData };
      });
    } else if (isSrc === "false") {
      this.setState(prevState => {
        const destTableData = [...prevState.destTableData];
        destTableData.push(newData);
        return { ...prevState, destTableData };
      });
    }
  };

  handleRowUpdate = (newData, oldData, isSrc) => {
    if (oldData) {
      if (isSrc === "true") {
        this.setState(prevState => {
          const srcTableData = [...prevState.srcTableData];
          srcTableData[srcTableData.indexOf(oldData)] = newData;
          return { ...prevState, srcTableData };
        });
      } else if (isSrc === "true") {
        this.setState(prevState => {
          const destTableData = [...prevState.destTableData];
          destTableData[destTableData.indexOf(oldData)] = newData;
          return { ...prevState, destTableData };
        });
      }
    }
  };

  handleRowDelete = (oldData, isSrc) => {
    if (isSrc === "true") {
      this.setState(prevState => {
        const srcTableData = [...prevState.srcTableData];
        srcTableData.splice(srcTableData.indexOf(oldData), 1);
        return { ...prevState, srcTableData };
      });
    } else if (isSrc === "false") {
      this.setState(prevState => {
        const destTableData = [...prevState.destTableData];
        destTableData.splice(destTableData.indexOf(oldData), 1);
        return { ...prevState, destTableData };
      });
    }
  };

  handleSubmitRulesBtn = () => {
    this.props.whichForm === "srcAddr"
      ? this.props.updateTableParams(this.state.srcTableData, "true")
      : this.props.updateTableParams(this.state.destTableData, "false");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <br />
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
          <br />
          <DynamicTable
            data={
              this.props.whichForm === "srcAddr"
                ? this.state.srcTableData
                : this.state.destTableData
            }
            header="Add New Rules"
            addRow={this.handleRowAdd}
            updateRow={this.handleRowUpdate}
            deleteRow={this.handleRowDelete}
            showMq={this.state.showTableMQ}
            isSrc={this.props.whichForm === "srcAddr" ? "true" : "false"}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmitRulesBtn}
          >
            Submit Rules
          </Button>
          {/* <FormControl>
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
          </FormControl> */}

          {/* <TextField
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
          /> */}
          {/* <TextField
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
          /> */}
          {/* <br />
          <br /> */}
          <div
            className={classes.centerMargin}
            style={{ display: this.state.showMethods }}
          >
            {/* <h5 className={classes.centerMargin}>Method</h5> */}
            {/* <RadioGroup
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
              <FormControlLabel value="GET" control={<Radio />} label="GET" />
              <FormControlLabel value="POST" control={<Radio />} label="POST" />
              <FormControlLabel value="PUT" control={<Radio />} label="PUT" />
            </RadioGroup> */}
          </div>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(AddressForm);
