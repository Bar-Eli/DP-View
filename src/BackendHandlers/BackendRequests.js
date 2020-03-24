import BackendConfigInput from './BackendConfigInput.js'

export default class BackendRequests {

    // CONSTANTS
    static DP_URL_PARAMS = "?host=10.0.3.4&port=5554&username=admin&password=admin&domain=Sandbox";
    static BACKEND_URL = "http://10.0.3.8:4000";

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
        return portResp["message"]

    }

    /**
     * Create New FSH on DP, using http requests to backend
     * @param input
     * @returns {Promise<void>}
     */
    static async createNewFsh(input) {

        let url = "";

        const protocol = input["srcAddr"]["protocol"];
        let payload = {};
        if (protocol === "") {
            alert("Select Protocol");
            return;
        }
        if (protocol === "http") {
            payload = BackendConfigInput.generateHttpFshReq(input);
            url = this.BACKEND_URL + "/api/http_handler" + this.DP_URL_PARAMS;
        }
        if (protocol === "mq") {
            payload = BackendConfigInput.generateMqFshReq(input);
            url = this.BACKEND_URL + "/api/mq_handler" + this.DP_URL_PARAMS;
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
     * Create New MPGW on DP, using http requests to backend
     * @param input -- User input params for MPGW creation.
     * @returns {Promise<void>}
     */
    static async createNewMpgw(input) {

        this.createNewFsh(input); // Create FSH for MPGW.

        // const port = await this.getFreePort();
        const port = 23;
        // const url = 'http://localhost:4000/'; // DEBUG
        const url = this.BACKEND_URL + "/api/mpgw" + this.DP_URL_PARAMS;

        const payload = BackendConfigInput.generateMpgwReq(input, port); // Create backend configuration for input.
        const data = JSON.stringify(payload);

        const options = {
            method: 'POST',
            body: data,
        };

        const response = await fetch(url, options);
        const responseData = await response.json();
        alert(responseData["message"])

    };
}
