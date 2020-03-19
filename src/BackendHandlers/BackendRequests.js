export default class BackendRequests {

    static createNewMpgw() {
        const url = 'http://localhost:4000/';
        const payload = require('./Configuraions/newMpgw');
        const data = JSON.stringify(payload);
        let h = new Headers({
            "host": "10.0.3.4",
            port: "5554",
            username: "admin",
            password: "admin",
            domain: "Sandbox",
        });


        const options = {
            method: 'POST',
            body: data,
            headers: h,
        };

        fetch('http://localhost:4000/', options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });


    };
}
