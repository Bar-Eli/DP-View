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
     * Get nodes hostname for the given cluster from input.
     * @param input -- User input params for MPGW creation.
     * @returns {Promise<any>}
     */
    static async getClusterNodesHostname(input) {
        const clusterDetails = await this.getClusterDetails(input);
        const nodes = clusterDetails["nodes"];
        let clusterNodesHostname = new Array(nodes.length);
        for (let i = 0; i < nodes.length; i++) {
            clusterNodesHostname[i] = nodes[i].host;
        }
        return clusterNodesHostname;
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

        for (let i = 0; i < urlParamsList.length; i++) {
            let url = this.BACKEND_URL + "/api/mpgw" + urlParamsList[i];
            let response = await fetch(url, options);
            let responseData = await response.json();
            console.log(responseData);
            alert(responseData["message"]);
        }



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


}
