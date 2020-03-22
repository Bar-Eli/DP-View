import BackendConfigInput from './BackendConfigInput.js'

export default class BackendRequests {

    static DP_URL_PARAMS = "?host=10.0.3.4&port=5554&username=admin&password=admin&domain=Sandbox";
    static BACKEND_URL = "http://10.0.3.8:4000";

    static async getFreePort() {

        // const url = 'http://localhost:4000/port'; // DEBUG
        const url = this.BACKEND_URL + "/api/status/port" + this.DP_URL_PARAMS;
        const response = await fetch(url);
        // console.log(response);
        const portResp = await response.json();
        if (portResp["status"] !== 200) {
            console.log("Error finding available port");
            return -1;
        }
        return portResp["message"]

    }

    static async createNewFsh(input) {

        let url = "";

        const protocol = input["srcAddr"]["protocol"];
        let payload = {};
        if (protocol === "") {
            alert("Select Protocol")
            return;
        }
        if (protocol === "http") {
            payload = BackendConfigInput.newHttpFsh(input);
            url = this.BACKEND_URL + "/api/http_handler" + this.DP_URL_PARAMS;
        }
        if (protocol === "mq") {
            payload = BackendConfigInput.newMqFsh(input);
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

    static async createNewMpgw(input) {

        this.createNewFsh(input);

        const port = await this.getFreePort();
        // const url = 'http://localhost:4000/'; // DEBUG
        const url = this.BACKEND_URL + "/api/mpgw" + this.DP_URL_PARAMS;

        const payload = BackendConfigInput.newMpgw(input, port); // Create backend configuration for input.
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
