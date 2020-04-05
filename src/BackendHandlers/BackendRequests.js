import BackendConfigInput from "./BackendConfigInput.js";

export default class BackendRequests {
  // CONSTANTS
  // static BACKEND_URL = "http://10.0.3.8:4000";
  static BACKEND_URL = "http://localhost:4000";

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
      method: "POST",
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
    for (let i = 0; i < rules.length; i++) {
      // For each rule
      for (let j = 0; j < urlParamsList.length; j++) {
        // For each machine in cluster
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
    const clusterDetails = await this.getClusterDetails(input);
    const urlParamsList = BackendConfigInput.generateClusterUrlParams(
      input,
      clusterDetails
    );
    const rules = input["rules"];

    // Create FSHs
    this.createNewFshs(rules, urlParamsList);

    // Upload files Test
    this.uploadFiles(rules);

    const payload = BackendConfigInput.generateMpgwReq(input, "new"); // Create backend configuration form input.
    const data = JSON.stringify(payload);
    const options = {
      method: "POST",
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
      let url = this.BACKEND_URL + "/api/mpgw" + urlParamsList[i];
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
        this.uploadFile(rules[i]["filter"]["schemaPath"]);
      }
    }
  }

  /**
   * Upload file to DP using backend request to git.
   * @param file -- JSON representing schema file from user input
   * @returns {Promise<void>}
   */
  static async uploadFile(file) {
    const url = this.BACKEND_URL + "/api/misc/uploadfile";
    const options = {
      method: "POST",
      body: file["content"],
      headers: {
        filename: file["name"],
      },
    };
    let response = await fetch(url, options);
    let responseData = await response.json();

    alert(responseData);
  }
}
