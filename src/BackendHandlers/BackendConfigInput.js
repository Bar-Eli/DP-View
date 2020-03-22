export default class BackendConfigInput {


    static newMpgw(input, port) {

        console.log(input);

        // Get basic backend configuration
        const config_file = require('./Configuraions/newMpgw');
        let config = JSON.parse(JSON.stringify(config_file));

        // Set MPGW and rule name
        const mpgwName = input["details"]["projectNameValue"];
        config["name"] = mpgwName;
        config["rules"][0]["name"] = mpgwName + "_rule";
        const fshName = mpgwName + "_FSH"; // Should get as input instead of assumption

        // Get destination and source protocols
        const srcProto = input["scrAddr"]["protocol"];
        const dstProto = input["destAddr"]["protocol"];

        // Config source URL (for match rule)
        if (srcProto === "http") {
            config["match"]["MatchRules"]["Url"] =
                "http://0.0.0.0:" + port + "/*";
        }
        if (srcProto === "mq") {
            config["match"]["MatchRules"]["Url"] =
                "dpmq://" + input["scrAddr"]["primaryAddress"] +"/" + fshName + "/?RequestQueue=" + input["destAddr"]["secondaryAddress"];
        }

        // Config destination URL
        if (dstProto === "http") {
            config["rules"][0]["actions"][2]["StylesheetParameters"][0]["ParameterValue"] =
                "http://" + input["destAddr"]["primaryAddress"] + ":" + input["destAddr"]["secondaryAddress"];
        }
        if (dstProto === "mq") {
            config["rules"][0]["actions"][2]["StylesheetParameters"][0]["ParameterValue"] =
                "dpmq://" + input["destAddr"]["primaryAddress"] + "/?RequestQueue=" + input["destAddr"]["secondaryAddress"];
        }


        // console.log("Check config");
        console.log(config);
        return config;


    };
}