export default class BackendConfigInput {

    /**
     * @param input -- DP MPGW information in user input style.
     * @returns JSON Configuration (body) for backend request to create a DP HTTP FSH.
     */
    static generateMqFshReq(input) {

        const config_file = require('./Configuraions/newMqFsh');
        let config = JSON.parse(JSON.stringify(config_file));

        // Acquire input from user
        const mpgwName = input["details"]["projectNameValue"];
        const queueMgr = input["srcAddr"]["primaryAddress"];
        const queueName = input["srcAddr"]["secondaryAddress"];

        // Set configuration params
        config["name"] = mpgwName + "_FSH"; // Set FSH name
        config["QueueManager"]["value"] = queueMgr;
        config["GetQueue"] = queueName;

        return config;
    }

    /**
     * @param input -- DP rule information in user input style.
     * @returns JSON Configuration (body) for backend request to create a DP HTTP FSH.
     */
    static generateHttpFshReq(input) {

        const config_file = require('./Configuraions/newHttpFsh');
        let config = JSON.parse(JSON.stringify(config_file));

        // Acquire input from user
        const ruleName = input["name"];
        const httpMethods = input["srcAddr"]["methods"];
        const port = input["srcAddr"]["secondaryAddress"]; // DP port to install FSH on.

        // Set configuration params
        config["name"] = ruleName + "_FSH"; // Set FSH name
        config["LocalAddress"] = "0.0.0.0";
        config["LocalPort"] = port;
        // Set http methods
        for (let i = 0; i < httpMethods.length; i++) {
            config["AllowedFeatures"][httpMethods[i]] = "on"; // Turn on given methods.
        }

        return config;

    }

    /**
     * @param input -- DP rule in user input style.
     * @param num -- rule number on MPGW.
     * @returns JSON Configuration (body) for backend request to create a DP rule.
     */
    static generateRuleReq(input, num) {

        const config_file = require('./Configuraions/newRule');
        let config = JSON.parse(JSON.stringify(config_file))["rules"][0]; // Configuration JSON for one rule.

        // Acquire input from user

        const ruleName = input["name"];
        const fshName = ruleName + "_FSH";
        const srcProto = input["srcAddr"]["protocol"];
        const dstProto = input["destAddr"]["protocol"];
        // Get input source addresses
        const srcPAddr = input["srcAddr"]["primaryAddress"];
        const scrSAddr = input["srcAddr"]["secondaryAddress"]; // if HTTP -- port to intsall rule on (for match action).
        // Get input destination addresses
        const dstPAddr = input["destAddr"]["primaryAddress"];
        const dstSAddr = input["destAddr"]["secondaryAddress"];

        // Set configuration

        config["name"] = ruleName + "_rule"; // Set rule name
        // Config source URL (for match rule)
        if (srcProto === "http") {
            config["match"]["MatchRules"]["Url"] =
                "http://0.0.0.0:" + scrSAddr + "/*";
        }
        if (srcProto === "mq") {
            config["match"]["MatchRules"]["Url"] =
                "dpmq://" + srcPAddr + "/" + fshName + "/?RequestQueue=" + scrSAddr;
        }
        // Config destination URL
        if (dstProto === "http") {
            config["actions"][2]["StylesheetParameters"][0]["ParameterValue"] =
                "http://" + dstPAddr + ":" + dstSAddr;
        }
        if (dstProto === "mq") {
            config["actions"][2]["StylesheetParameters"][0]["ParameterValue"] =
                "dpmq://" + dstPAddr + "/?RequestQueue=" + dstSAddr;
        }

        return config;
    }

    /**
     * @param input -- DP MPGW information in user input style.
     * @returns JSON Configuration (body) for backend request to create a MPGW.
     */
    static generateMpgwReq(input) {

        // Get basic backend configuration
        const config_file = require('./Configuraions/newMpgw');
        let config = JSON.parse(JSON.stringify(config_file));

        // Acquire input from user
        const mpgwName = input["details"]["projectNameValue"];

        config["name"] = mpgwName; // Set MPGW name

        // Set rules
        const rules = input["rules"];
        let configRules = [];
        for (let i = 0; i < rules.length; i++) {
            let rule = this.generateRuleReq(rules[i], i);
            configRules.push(JSON.parse(JSON.stringify(rule))); // push copied rule
        }
        config["rules"] = configRules;

        // Add FSHs to MPGW's handlers
        let handlers = [];
        for (let i = 0; i < rules.length; i++) {
            let fshName = rules[i]["name"] + "_FSH";
            handlers.push(JSON.parse(JSON.stringify(fshName)));

        }
        config["handlers"] = handlers;

        console.log(config);
        return config;

    }

    /**
     *  Get list of url params to use for backend requests for DP cluster
     * @param input -- DP MPGW information in user input style.
     * @param clusterDetails -- cluster details as returned from backend.
     */
    static generateClusterUrlParams(input, clusterDetails) {

        let urlParamsList = [];
        const dpCredentials = input["dpCredentials"];
        const nodes = clusterDetails["nodes"];
        for (let i = 0; i < nodes.length; i++) {
            // let urlParams = "?host=" + nodes[i]["host"] + "&port=" + nodes[i]["port"] + "&username=" +
            //     dpCredentials["username"] + "&password=" + dpCredentials["password"] + "&domain=" + clusterDetails["domain"];
            let urlParams = `"?host=${nodes[i]["host"]}&port=${nodes[i]["port"]}&username=${dpCredentials["username"]}&password=${dpCredentials["password"]}&domain=${clusterDetails["domain"]}`;
            urlParamsList.push(urlParams);
        }
        return urlParamsList;
    }

}