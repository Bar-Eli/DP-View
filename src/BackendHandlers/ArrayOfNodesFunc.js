import BackendConfigInput from './BackendConfigInput.js'

export default class BackendRequests {

    // CONSTANTS
    // static BACKEND_URL = "http://10.0.3.8:4000";
    static BACKEND_URL = "http://localhost:4000";

    /**
     * Get details (domain / IPs / rest ports) for the given cluster from input.
     * @param input -- User input params for MPGW creation.
     * @returns {Promise<any>}
     */
    static async getClusterDetails(input) {
        const clusterName = input["details"]["clusterName"];
        const testOrProd = input["details"]["testOrProd"];
        const url = this.BACKEND_URL + "/api/status/cluster/" + clusterName + "/" + testOrProd;
        const response = await fetch(url);
        return await response.json();  // return cluster details
    }

    /**
     * Get details (domain / IPs / rest ports) for the given cluster and test / prod environment.
     * @param clusterName -- The cluster name.
     * @param testOrProd -- The environment.
     * @returns {Promise<any>}
     */
    static async getClusterDetailsByClusterName(clusterName, testOrProd) {
        const url = this.BACKEND_URL + "/api/status/cluster/" + clusterName + "/" + testOrProd;
        const response = await fetch(url);
        return await response.json();  // return cluster details
    }

    /**
     * Get nodes hostname for the given cluster from input.
     * @param clusterName -- User input params for MPGW creation.
     * @returns {Array}
     */
    static async getClusterNodesHostname(clusterName, testOrProd) {
        const clusterDetails = await this.getClusterDetailsByClusterName(clusterName, testOrProd);
        const nodes = clusterDetails["nodes"];
        let clusterNodesHostname = new Array(nodes.length);
        for (let i = 0; i < nodes.length; i++) {
            clusterNodesHostname[i] = nodes[i].host;
        }
        return clusterNodesHostname;
    }


    /**
     * Create New FSH on DP, using http requests to backend
     * @param input -- User input params for rule creation.
     * @param DpUrlParams -- params for backend url for Dp machine to create FSH on.
     * @returns {Promise<void>}
     */
    static async createNewFsh(input, DpUrlParams) {

        let url = "";

        const protocol = input["srcAddr"]["protocol"];
        let payload = {};
        if (protocol === "") {
            alert("Select Protocol");
            return;
        }
        if (protocol === "http") {
            payload = BackendConfigInput.generateHttpFshReq(input);
            url = this.BACKEND_URL + "/api/http_handler" + DpUrlParams;
        }
        if (protocol === "mq") {
            payload = BackendConfigInput.generateMqFshReq(input);
            url = this.BACKEND_URL + "/api/mq_handler" + DpUrlParams;
        }

        // url = "http://localhost:4000/"; // DEBUG
        const data = JSON.stringify(payload);
        const options = {
            method: 'POST',
            body: data,
        };
        const response = await fetch(url, options);
        const responseData = await response.json();
        console.log(responseData);

    }

    /**
     * Create FSHs For each rule created by user.
     * @param rules -- list of rules in user input format.
     * @param urlParamsList -- list of URL representing DP machines for backend.
     * @returns {Promise<void>}
     */
    static async createNewFshs(rules, urlParamsList) {
        for (let i = 0; i < rules.length; i++) {  // For each rule
            for (let j = 0; j < urlParamsList.length; j++) {  // For each machine in cluster
                this.createNewFsh(rules[i], urlParamsList[j]);
            }
        }
    }


    /**
     * Create New MPGW on DP, using http requests to backend
     * @param input -- User input params for MPGW creation.
     * @returns {Promise<void>}
     */
    static async createNewMpgw(input) {

        // this.getFileContent();
        const clusterDetails = await this.getClusterDetails(input);
        const urlParamsList = BackendConfigInput.generateClusterUrlParams(input, clusterDetails);
        const rules = input["rules"];
        // Create FSHs
        this.createNewFshs(rules, urlParamsList);
        const payload = BackendConfigInput.generateMpgwReq(input); // Create backend configuration form input.
        const data = JSON.stringify(payload);
        const options = {
            method: 'POST',
            body: data,
        };
        let clusterResponseStatus = {};
        for (let i = 0; i < urlParamsList.length; i++) {
            let url = this.BACKEND_URL + "/api/mpgw" + urlParamsList[i];
            let response = await fetch(url, options);
            let responseData = await response.json();
            if(response.status === 200){
                let hostname = clusterDetails["nodes"][i].host;
                clusterResponseStatus[hostname] = true
            }
            else{
                let hostname = clusterDetails["nodes"][i].host;
                clusterResponseStatus[hostname] = false
            }
        }
        return clusterResponseStatus;


    }

    static async getFileContent() {

        const path = "C:\\Users\\Alon\\Desktop\\someFile.json";
        // const config_file = require(path);
        // console.log(config_file);


        const fs = require('fs');

        fs.readFile(path, (err, data) => {
            if (err) throw err;

            console.log(data.toString());
        })


    }

    static async createNewFsh(input, DpUrlParams) {

        let url = "";

        const protocol = input["srcAddr"]["protocol"];
        let payload = {};
        if (protocol === "") {
            alert("Select Protocol");
            return;
        }
        if (protocol === "http") {
            payload = BackendConfigInput.generateHttpFshReq(input);
            url = this.BACKEND_URL + "/api/http_handler" + DpUrlParams;
        }
        if (protocol === "mq") {
            payload = BackendConfigInput.generateMqFshReq(input);
            url = this.BACKEND_URL + "/api/mq_handler" + DpUrlParams;
        }

        // url = "http://localhost:4000/"; // DEBUG
        const data = JSON.stringify(payload);
        const options = {
            method: 'POST',
            body: data,
        };
        const response = await fetch(url, options);
        const responseData = await response.json();
        console.log(responseData);

    }


}
