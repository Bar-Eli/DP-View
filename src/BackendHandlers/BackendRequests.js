import BackendConfigInput from './BackendConfigInput.js'

export default class BackendRequests {

    static async getFreePort() {

        const url = 'http://localhost:4000/port';
        const options = {
            method: 'GET',
        };
        const response = await fetch('http://localhost:4000/port');
        // console.log(response);
        const portResp = await response.json();
        if(portResp["status"] !== 200) {
            console.log("Error finding available port");
            return -1;
        }
        return portResp["message"]

    }

    static async createNewMpgw(input) {


        const port = await this.getFreePort();
        // const url = 'http://10.0.3.8:4000/api/mpgw?host=10.0.3.4&port=5554&username=admin&password=admin&domain=Sandbox';
        const url = 'http://localhost:4000/';
        const payload = BackendConfigInput.newMpgw(input, port); // Create backend configuration for input.
        const data = JSON.stringify(payload);
        // let h = new Headers({
        //     "host": "10.0.3.4",
        //     port: "5554",
        //     username: "admin",
        //     password: "admin",
        //     domain: "Sandbox",
        // });


        const options = {
            method: 'POST',
            body: data,
            //headers: h,
        };

        fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Response");
                console.log(data);
            });

    };
}
