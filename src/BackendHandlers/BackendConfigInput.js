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
     * @param input -- DP MPGW information in user input style.
     * @param port -- DP port to install FSH on.
     * @returns JSON Configuration (body) for backend request to create a DP HTTP FSH.
     */
    static generateHttpFshReq(input, port) {

        const config_file = require('./Configuraions/newHttpFsh');
        let config = JSON.parse(JSON.stringify(config_file));

        // Acquire input from user
        const mpgwName = input["details"]["projectNameValue"];
        const httpMethods = input["srcAddr"]["methods"];

        // Set configuration params
        config["name"] = mpgwName + "_FSH"; // Set FSH name
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
     * @param port -- Port on DP to install rule on (for match action).
     * @returns JSON Configuration (body) for backend request to create a DP rule.
     */
    static generateRuleReq(input, port) {

        const config_file = require('./Configuraions/newRule');
        let config = JSON.parse(JSON.stringify(config_file))["rules"][0]; // Configuration JSON for one rule.

        // Acquire input from user

        const mpgwName = input["details"]["projectNameValue"];
        const fshName = mpgwName + "_FSH"; // Should get as input instead of assumption(?)
        // Get destination and source protocols
        const srcProto = input["srcAddr"]["protocol"];
        const dstProto = input["destAddr"]["protocol"];
        // Get input source addresses
        const srcPAddr = input["srcAddr"]["primaryAddress"];
        const scrSAddr = input["srcAddr"]["secondaryAddress"];
        // Get input destination addresses
        const dstPAddr = input["destAddr"]["primaryAddress"];
        const dstSAddr = input["destAddr"]["secondaryAddress"];

        // Set configuration

        config["name"] = mpgwName + "_rule"; // Set rule name
        // Config source URL (for match rule)
        if (srcProto === "http") {
            config["match"]["MatchRules"]["Url"] =
                "http://0.0.0.0:" + port + "/*";
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
     * @param port -- DP port to install MPGW on.
     * @returns JSON Configuration (body) for backend request to create a MPGW.
     */
    static generateMpgwReq(input, port) {

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
            let rule = this.generateRuleReq(rules[i], port);
            configRules.push(JSON.parse(JSON.stringify(rule))); // push copied rule
        }
        config["rules"] = configRules;

        // Add FSH to MPGW
        const fshName = mpgwName + "_FSH";
        config["handlers"] = [fshName];

        console.log(config);
        return config;


    };


}