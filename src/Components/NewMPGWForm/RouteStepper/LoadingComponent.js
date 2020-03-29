import React, { Component } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, withStyles  } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { render } from '@testing-library/react';
import CreateIcon from '@material-ui/icons/Create';
import MachineButton from './MachineButtonComponent';

const useStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
      },
      wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
      buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
      buttonFailed: {
        backgroundColor: red[500],
        '&:hover': {
          backgroundColor: red[700],
        },
      },
      fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
      buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
      ul:{
        listStyleType: 'none'
      }
  });

class CircularIntegration extends Component{
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          success: false,
          buttonClass: "",
          clusterSize: 3  
        };
        
      }

  handleButtonClick = () => {
    const { classes } = this.props;
    this.setState({ loading: true});

    const timer = setTimeout(() => {
        const successResponse = {
            "DataPower2": true,
            "DataPower4": false,
            "DataPower6": true
        }
        this.setState({ 
            loading: false,
            success: true,
            buttonClass: classes.buttonSuccess
        });
      }, 1000);
    return () => clearTimeout(timer);
  }

  componentWillMount = () => {
    let arr = ["DataPower2", "DataPower4", "DataPower6"];
    let hostnameStatus = {};
    for (let index = 0; index < arr.length; index++) {
      let hostname = arr[index];
      hostnameStatus[hostname] = false;
    };
    this.setState({
      hostnameStatus
  });
  }

  render(){
    const { classes } = this.props;
    let arr = ["DataPower2", "DataPower4", "DataPower6"];
    console.log(this.state)

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={this.state.buttonClass}
          disabled={this.state.success}
          onClick={this.handleButtonClick}
        >
         Create
        </Button>
        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>

      <div> 
        <ul className={classes.ul}>
        {arr.map(item => 
        <li key={item} value={item}>
            <MachineButton 
            loading={this.state.loading}
            success={this.state.success}
            buttonClass={this.state.buttonClass}
            hostname={item}
            failed={false}
            />
        </li>
        )}
        </ul>
      </div>
    </div>
  );
  }
}

export default withStyles(useStyles, { withTheme: true })(CircularIntegration);
