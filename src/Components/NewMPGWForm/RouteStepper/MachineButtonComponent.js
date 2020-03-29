import React, { Component } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, withStyles  } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { render } from '@testing-library/react';
import CreateIcon from '@material-ui/icons/Create';

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
          loading: this.props.loading,
          success: this.props.success,
          failed: false,
          buttonClass: "", 
        };
        
      }


  render(){
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="create route"
          color="primary"
          className={this.state.buttonClass}
        >
          {this.props.success ? <CheckIcon /> : <CreateIcon fontSize='large' />}
        </Fab>
        {this.props.loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
    </div>
  );
  }
}

export default withStyles(useStyles, { withTheme: true })(MachineButton);
