import React, { Component } from 'react';
import { withStyles  } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import ErrorIcon from '@material-ui/icons/Error';

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
      }
  });

class MachineButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
          hostname: this.props.hostname,
          loading: this.props.loading,
          success: this.props.success,
          loaded: this.props.loaded,
          checkStatus: true, 
        };
      }

      checkStatus = () => {
        // Check if the create process has done
        const { classes } = this.props;
        if(this.props.loaded && this.state.checkStatus){
          if(this.props.success === true)
            this.setState({
              buttonClass: classes.buttonSuccess,
              checkStatus: false
            });
          else
            this.setState({
              buttonClass: classes.buttonFailed,
              checkStatus: false
            });
          }
      }

  render(){
    const { classes } = this.props;
    this.checkStatus();
  return (
    <div className={classes.root}>
        <p style={this.props.style}>{this.state.hostname}</p>
      <div className={classes.wrapper}>
        <Fab
          aria-label="create route"
          color="primary"
          style={this.props.style}
          className={this.state.buttonClass}
        >
          {this.props.success ? <CheckIcon /> : (this.props.loaded ? <ErrorIcon fontSize='large'/> : <CreateIcon fontSize='large' />)}
        </Fab>
        {this.props.loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
    </div>
  );
  }
}

export default withStyles(useStyles, { withTheme: true })(MachineButton);
