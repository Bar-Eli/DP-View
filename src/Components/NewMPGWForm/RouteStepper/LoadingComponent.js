import React, { Component } from 'react';
import { createStyles, makeStyles, Theme, withStyles  } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
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
          clusterNodesHostName: this.props.clusterNodesHostName,
          loading: false,
          success: false,
          buttonClass: "",
          clusterSize: 3,
          loaded: false,  
        };
        
      }

  handleButtonClick = async () => {
    const { classes } = this.props;
    this.setState({ 
      loading: true,
    });
    // Create new MPGW and get the status response of the cluster
    const clusterResponseStatus = await this.props.createMPGW();
    // Set the current state of the cluster
    this.setState({ 
      loading: false,
      loaded: true,
      success: true,
      buttonClass: classes.buttonSuccess,
      clusterResponseStatus
    });
  }

  componentWillMount = () => {
    // Create a state for the nodes of the cluster that passed by props
    let clusterResponseStatus = {};
    for (let index = 0; index < this.props.clusterNodesHostName.length; index++) {
      let hostname = this.props.clusterNodesHostName[index];
      clusterResponseStatus[hostname] = false;
    };
    this.setState({
      clusterResponseStatus
  });
  }

  render(){
    const { classes } = this.props;
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          style={this.props.style}
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
         {this.props.clusterNodesHostName.map(item => 
        <li key={item} value={item}>
            <MachineButton 
            style={this.props.style}
            loading={this.state.loading}
            success={this.state.clusterResponseStatus[item]}
            hostname={item}
            loaded={this.state.loaded}
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