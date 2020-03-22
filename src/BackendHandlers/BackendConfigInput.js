export default class BackendConfigInput {

    // create matching backend configuration from user input for new MQ FSH request.
    static newMqFsh(input) {

        const config_file = require('./Configuraions/newMqFsh');
        let config = JSON.parse(JSON.stringify(config_file));

        const mpgwName = input["details"]["projectNameValue"];
        const queueMgr = input["srcAddr"]["primaryAddress"];
        const queueName = input["srcAddr"]["secondaryAddress"];

        config["name"] = mpgwName + "_FSH"; // Set FSH name
        config["QueueManager"]["value"] = queueMgr;
        config["GetQueue"] = queueName;

        return config;
    }

    // create matching backend configuration from user input for new HTTP FSH request.
    static newHttpFsh(input) {

        const config_file = require('./Configuraions/newHttpFsh');
        let config = JSON.parse(JSON.stringify(config_file));

        const mpgwName = input["details"]["projectNameValue"];
        const localAddress = input["srcAddr"]["primaryAddress"];
        const localPort = input["srcAddr"]["secondaryAddress"];
        const httpMethod = input["srcAddr"]["method"];

        config["name"] = mpgwName + "_FSH"; // Set FSH name
        config["localAddress"] = localAddress;
        config["localPort"] = localPort;
        config["AllowedFeatures"][httpMethod] = "on";

        return config;

    }

    // create matching backend configuration from user input for new MPGW request.
    static newMpgw(input, port) {

        // Get basic backend configuration
        const config_file = require('./Configuraions/newMpgw');
        let config = JSON.parse(JSON.stringify(config_file));

        // Set MPGW and rule name
        const mpgwName = input["details"]["projectNameValue"];
        config["name"] = mpgwName;
        config["rules"][0]["name"] = mpgwName + "_rule";
        const fshName = mpgwName + "_FSH"; // Should get as input instead of assumption

        // Get destination and source protocols
        const srcProto = input["srcAddr"]["protocol"];
        const dstProto = input["destAddr"]["protocol"];

        // Get input source addresses
        const srcPAddr = input["srcAddr"]["primaryAddress"];
        const scrSAddr = input["srcAddr"]["secondaryAddress"];

        // Get input destination addresses
        const dstPAddr = input["destAddr"]["primaryAddress"];
        const dstSAddr = input["destAddr"]["secondaryAddress"];


        // Config source URL (for match rule)
        if (srcProto === "http") {
            config["rules"][0]["match"]["MatchRules"]["Url"] =
                "http://0.0.0.0:" + port + "/*";
        }
        if (srcProto === "mq") {
            config["rules"][0]["match"]["MatchRules"]["Url"] =
                "dpmq://" + srcPAddr + "/" + fshName + "/?RequestQueue=" + scrSAddr;
        }

        // Config destination URL
        if (dstProto === "http") {
            config["rules"][0]["actions"][2]["StylesheetParameters"][0]["ParameterValue"] =
                "http://" + dstPAddr + ":" + dstSAddr;
        }
        if (dstProto === "mq") {
            config["rules"][0]["actions"][2]["StylesheetParameters"][0]["ParameterValue"] =
                "dpmq://" + dstPAddr + "/?RequestQueue=" + dstSAddr;
        }


        // console.log("Check config");
        console.log(config);
        return config;


    };
}