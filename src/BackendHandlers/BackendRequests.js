import BackendConfigInput from "./BackendConfigInput.js";

export default class BackendRequests {
    // CONSTANTS
    static BACKEND_URL = process.env.REACT_APP_API_URL;

    /**
     * Get list of clusters for input choosing
     * @returns {Promise<void>} [] list of cluster names from backend.
     */
    static async getClustersNames() {
        const url = this.BACKEND_URL + "/api/status/cluster/prod";
        const response = await fetch(url);
        return await response.json(); // return clusters names.
    }

    /**
     * Get details (domain / IPs / rest ports) for the given cluster and test / prod environment.
     * @param clusterName -- The cluster name.
     * @param testOrProd -- The environment.
     * @returns {Promise<any>}
     */
    static async getClusterDetailsByClusterName(clusterName, testOrProd) {
        const url =
            this.BACKEND_URL +
            "/api/status/cluster/" +
            clusterName +
            "/" +
            testOrProd;
        const response = await fetch(url);
        return await response.json(); // return cluster details
    }

    /**
     * Get nodes hostname for the given cluster from input.
     * @param clusterName -- User input params for MPGW creation.
     * @returns {Array}
     */
    static async getClusterNodesHostname(clusterName, testOrProd) {
        const clusterDetails = await this.getClusterDetailsByClusterName(
            clusterName,
            testOrProd
        );
        const nodes = clusterDetails["nodes"];
        let clusterNodesHostname = new Array(nodes.length);
        for (let i = 0; i < nodes.length; i++) {
            clusterNodesHostname[i] = nodes[i].host;
        }
        return clusterNodesHostname;
    }

    /**
     * Get details (domain / IPs / rest ports) for the given cluster from input.
     * @param input -- User input params for MPGW creation.
     * @returns {Promise<any>}
     */
    static async getClusterDetails(input) {
        const clusterName = input["details"]["clusterName"];
        const testOrProd = input["details"]["testOrProd"];
        const url =
            this.BACKEND_URL +
            "/api/status/cluster/" +
            clusterName +
            "/" +
            testOrProd;
        const response = await fetch(url);
        return await response.json(); // return cluster details
    }

    /**
     * Get a number of an available port on DP using http request to backend.
     * @returns {Promise<number|*>} the number of the free port to use.
     */
    static async getFreePort() {
        // const url = 'http://localhost:4000/port'; // DEBUG
        const url = this.BACKEND_URL + "/api/status/port" + this.DP_URL_PARAMS;
        const response = await fetch(url);
        const portResp = await response.json();
        if (portResp["status"] !== 200) {
            console.log("Error finding available port");
            return -1;
        }
        return portResp["message"];
    }

    /**
     *
     * @param clusterName -- name of cluster to retrieve environments from.
     * @param testOrProd -- type of cluster to retrieve the information.
     * @returns {Promise<any>} JSON representing mq environments (for cluster?)
     */
    static async getMqEnvironments(clusterName, testOrProd) {
        const url = this.BACKEND_URL + "/api/status/" + clusterName + "/" + testOrProd + "/environments";
        const response = await fetch(url);
        return await response.json();
    }

    /**
     *
     * @param clusterName -- name of cluster to retrieve MQ managers from.
     * @param testOrProd --  type of cluster to retrieve the information.
     * @returns {Promise<void>} -- list of MQ managers in the given cluster.
     */
    static async getMqManagers(clusterName, testOrProd) {
        const url = this.BACKEND_URL + "/api/mqqm/" + clusterName + "/" + testOrProd;
        const response = await fetch(url);
        return await response.json();
    }

    /**
     * Check if a given mpgw (by name) already exists on specific cluster.
     * @param mpgwName -- name of mpgw to check if exists.
     * @param clusterName -- name of cluster to check mpgw name on.
     * @param testOrProd -- environment in cluster to check.
     * @returns {Promise<void>} -- true if mpgw exsists, false if not
     */
    static async isMpgwExsists(mpgwName, clusterName, testOrProd) {
        const url = this.BACKEND_URL + "/api/mpgw/" + clusterName + "/" + testOrProd + "/check/" + mpgwName;
        const response = await fetch(url);
        const resp = await response.json();
        // status is 409 if exists, 404 otherwise (not found).
        return resp.status === 409;
    }

    /**
     * Check if given source port in cluster is available
     * @param port
     * @param clusterName
     * @param testOrProd
     * @returns {Promise<*>} -- true if port is free, false otherwise.
     */
    static async isPortFree(port, clusterName, testOrProd) {
        const url = this.BACKEND_URL + "/api/status/" + clusterName + "/" + testOrProd + "/port/" + port;
        const response = await fetch(url);
        const resp = await response.json();
        return resp.message;
    }

    /**
     * Create New MPGW on DP, using http requests to backend
     * @param input -- User input params for MPGW creation.
     * @returns {Promise<void>}
     */
    static async createNewMpgw(input, hostname) {
        this.uploadFiles(input.rules)
        const clusterDetails = await this.getClusterDetails(input);
        const urlParams = BackendConfigInput.generateCreationUrlParams(input, clusterDetails, hostname);
        const data = JSON.stringify(input);
        const options = {
          method: "POST",
          body: data,
        };
        let url = this.BACKEND_URL + "/api/template/mpgw" + urlParams;
        let response = await fetch(url, options);
        let responseData = await response.json();
        let obj = {};
        obj["message"] = responseData.message;  
        if (response.status === 200) obj["status"] = true;
        else obj["status"] = false;
        return obj;
      }

    /**
     * Create New MPGW on DP, using http requests to backend
     * @param input -- User input params for updating an existing MPGW.
     * @returns {Promise<void>}
     */
    static async updateMpgw(input) {
        const clusterDetails = await this.getClusterDetails(input);
        const urlParamsList = BackendConfigInput.generateClusterUrlParams(
            input,
            clusterDetails
        );
        const rules = input["rules"];

        //Not Sure if we need this here, up to you Bareli
        // Create FSHs
        // this.createNewFshs(rules, urlParamsList);

        // Upload files Test
        this.uploadFiles(rules);

        const payload = BackendConfigInput.generateMpgwReq(input, "update"); // Create backend configuration form input.
        const data = JSON.stringify(payload);
        const options = {
            method: "PUT",
            body: data,
        };

        for (let i = 0; i < urlParamsList.length; i++) {
            let url = this.BACKEND_URL + "/api/template/mpgw" + urlParamsList[i];
            let response = await fetch(url, options);
            let responseData = await response.json();
            console.log(responseData);
            alert(responseData["message"]);
        }
    }

    /**
     * Upload files required for MPGW creation.
     * @param rules -- Rules in user input format.
     */
    static uploadFiles(rules) {
        for (let i = 0; i < rules.length; i++) {
            if (rules[i]["filter"]["filterType"] === "schema") {
                if (rules[i]["filter"]["schemaContent"] !== "")
                    this.uploadFile(rules[i]["filter"]["schemaPath"], rules[i]["filter"]["schemaContent"]);
            }
        }
    }

    /**
     * Upload file to DP using backend request to git.
     * @param file -- JSON representing schema file from user input
     * @returns {Promise<void>}
     */
    static async uploadFile(name, content) {
        const url = this.BACKEND_URL + "/api/misc/uploadfile";
        const options = {
            method: "POST",
            body: content,
            headers: {
                filename: name,
            },
        };
        let response = await fetch(url, options);
        let responseData = await response.json();
    }

    /**
     * Upload file to DP using backend request to git.
     * @param file -- JSON representing schema file from user input
     * @returns {Promise<void>}
     */
    static async getSchemas(clusterName, clusterType, parent_directory) {
        const url = this.BACKEND_URL + `/api/filestore/${clusterName}/${clusterType}/${parent_directory}`;
        const options = {
            method: "GET",
        };
        let response = await fetch(url, options);
        let responseData = await response.json();
        return responseData
    }

}
