import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RouteStepper from "./RouteStepper/RouteStepper";
import Navbar from "../Navbar";
// import BackendRequests from "../../BackendHandlers/BackendRequests.js";
import BackendRequests from "../../BackendHandlers/BackendRequests.js";
import LoadingComponent from './RouteStepper/LoadingComponent';
import GetArray from "../../BackendHandlers/ArrayOfNodesFunc.js";

const useStyles = theme => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    stylish: {
        background: "linear-gradient(45deg, #29323c 30%, #485563 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px #29323c",
        color: "white",
        // height: 48,
        padding: "0 30px",
        textTransform: "none"
    },
    createBtn: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '0 40px',
        marginLeft: '60px'
    }
});

class NewRoutePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreate: 'none',
            // showCreate: 'block', // DEBUG
            inputParams: {},
            clusterNodesHostName: [],
            clusterName: "",
        };
        this.inputParams = {};
    }

    refreshPage = () => {
        window.location.reload(false);
    };

    async createMPGW(){
        const response = await GetArray.createNewMpgw(this.inputParams);
        return response;
    };

    setInput = (inputJson) => {
        this.setState({showCreate: 'block'});
        this.inputParams = inputJson;
        this.setClusterNodesHostNameArr(this.state.clusterName);
    };

    
    async setClusterNodesHostNameArr(clusterName, testOrProd) {
        // Get array of nodes from the API
        let clusterNodesHostname = await GetArray.getClusterNodesHostname(clusterName, testOrProd);
        // Set the array as the state of clusterNodesHostName
        this.setState({ clusterNodesHostName: clusterNodesHostname})
    }

    hideCreate = () => {
        this.setState({showCreate: 'none'})
    };

    render() {
        console.log(this.inputParams)
        const {classes} = this.props; // how to assign UseStyleS
        return (
            <div className={classes.root}>
                <Navbar/>
                <br/>
                <Button
                    variant="contained"
                    className={classes.stylish}
                    onClick={this.refreshPage}
                >
                    <Typography variant="h4" component="h2">
                        New MPGW
                    </Typography>
                </Button>

                <RouteStepper setInput={this.setInput} hideCreate={this.hideCreate} setClusterName={this.setClusterNodesHostNameArr.bind(this)}/>

                <br/>
                <LoadingComponent 
                style={{display: this.state.showCreate}} 
                createMPGW={this.createMPGW.bind(this)}
                clusterNodesHostName={this.state.clusterNodesHostName}
                />
            </div>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(NewRoutePage);