import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import BackendRequests from "../../../BackendHandlers/BackendRequests";


const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  container: {
    justifyContent: "center"
  },
  center: {
    width: "auto",
  },
  centerMargin: {
    margin: "auto",
  },
  input: {
    display: "none",
  },
  fileName: {
    paddingLeft: "10px",
    fontSize: "1.3em",
  },
});

class FilterForm extends Component {
  constructor(props) {
    super(props);
    // verify if form is complete somehow
    this.state = {
      greenBtnBackground: "default",
      greenBtnColor: "default",
      schemaBtnColor: "default",
      dpasBtnColor: "default",
      dpasService: undefined,
      filterType: "green",
      fileName: "",
      useExistingSchema: false,
      schemas: []
    };
    
    this.props.validationHandler(true);
  }

  schemaBtnClick = () => {
    this.setState({
      greenBtnColor: "default",
      schemaBtnColor: "primary",
      dpasBtnColor: "default",
      greenBtnBackground: "#e0e0e0",
      filterType: "schema"
    });
    this.props.setParams("schema", "filterType", "filter");
  };

  dpasBtnClick = () => {
    this.setState({
      greenBtnColor: "default",
      schemaBtnColor: "default",
      dpasBtnColor: "primary",
      greenBtnBackground: "#e0e0e0",
      filterType: "dpas"
    });
    this.props.setParams("dpass", "filterType", "filter");
  };

  greenBtnClick = () => {
    this.setState({
      greenBtnColor: "primary",
      schemaBtnColor: "default",
      dpasBtnColor: "default",
      greenBtnBackground: "green",
      filterType: "green"
    });
    this.props.setParams("green", "filterType", "filter");
  };

  handleChangeDpas = (event) => {
    this.props.setParams(event.target.value, "dpasFilter", "filter");
  };

  uploadFile = async (event) => {
    const file = event.target.files[0];
    const fileName = file["name"];
    this.setState({ fileName: fileName });
    const fileContent = await file.text();
    this.props.setParams(fileName, "schemaPath", "filter");
    this.props.setParams(fileContent, "schemaContent", "filter");
  };


  renderSchemasSelect = () => {
    let schemas = this.state.schemas
    let options = []
    options = schemas.map((schema, index) => {
        return (<MenuItem id={index} value={schema}>{schema}</MenuItem>);
    });
    return options
  }


  componentDidMount() {
    this.greenBtnClick();
  }

  async componentWillMount() {
    let respSchemas = await BackendRequests.getSchemas(this.props.details.clusterName, this.props.details.testOrProd, "local")
    this.setState({
        schemas: respSchemas
    })
  }

  renderFilterForm = (classes) => {
    if (this.state.filterType == "dpas") {
      return (
        <FormControl>
          <InputLabel id="demo-simple-select-label">DPAS service</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.dpasService}
            onChange={this.handleChangeDpas}>
            <MenuItem value={"Salim"}>Salim</MenuItem>
            <MenuItem value={"Tzadok"}>Tzadok</MenuItem>
            <MenuItem value={"Nimbus"}>Nimbus</MenuItem>
          </Select>
        </FormControl>
      )
    } else if (this.state.filterType == "schema") {
      return (
        <FormControl style={{"width": "100%"}}>
          <Grid container spacing={1}>
            <Grid container item xs={12} justify="center" spacing={3}>
              <Grid item xs={4} spacing={2}>
                <ButtonGroup variant="contained" color="primary">
                  <Button onClick={() => this.setState({useExistingSchema: true})}>Use Existing Schema</Button>
                  <Button onClick={() => this.setState({useExistingSchema: false})}>Upload New Schema</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid container item xs={12}  justify="center" spacing={3}>
              <Grid item xs={4}  spacing={2} >
                { this.state.useExistingSchema == true ?
                  <Select
                      value=""
                      onChange={e => { return null}}
                      displayEmpty
                      style={{minWidth: "200px"}}
                      inputProps={{ 'aria-label': 'Without label' }}>
                      {this.renderSchemasSelect()}
                  </Select>
                :
                  <React.Fragment>
                    <input
                      accept="text/xml,application/json,text/xsl,text/xsd"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={this.uploadFile}/>
                    <label htmlFor="contained-button-file" style={{marginLeft: "1rem"}}>
                      <Button variant="contained" color="default" component="span"  startIcon={<CloudUploadIcon />}>Upload</Button>
                    </label>
                    <Typography className={classes.fileName}>
                      {this.state.fileName}
                    </Typography>
                  </React.Fragment>
                }
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      )
    } else {
      return 
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root} noValidate>
          <Button variant="contained" color={this.state.greenBtnColor} style={{ background: this.state.greenBtnBackground }} onClick={this.greenBtnClick}>Green Route</Button>
          <Button variant="contained" color={this.state.schemaBtnColor} onClick={this.schemaBtnClick}>Schema</Button>
          <Button variant="contained" color={this.state.dpasBtnColor} onClick={this.dpasBtnClick}>DPAS</Button>
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          {this.renderFilterForm(classes)}
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(FilterForm);
