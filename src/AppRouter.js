import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewRoutePage from "./Components/NewMPGWForm/NewRoutePage";
import EditRuleStepper from "./Components/EditRuleForm/EditRules";
<<<<<<< HEAD
import RuleTable from "./Components/RuleTable";
=======
import HorizontalPage from "./Components/NewMPGWHorizontal/HorizontalPage";
>>>>>>> horizontalStepper
// import HorizontalNonLinearAlternativeLabelStepper from "./Components/HorizontalStepper";

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={NewRoutePage} />
        {/* <Route path="/addRule" component={NewRulePage} /> */}
        <Route path="/editRule" component={EditRuleStepper} />
<<<<<<< HEAD
        <Route path="/rule" component={() => <RuleTable data={{
          "details": {
            "projectNameValue": "",
            "projectMadorValue": "",
            "projectTeamValue": "",
            "testOrProd": ""
          },
          "rules": [
            {
              "name": "Logs_To_Elastic",
              "srcAddr": {
                "network": "test",
                "protocol": "HTTP",
                "primaryAddress": "124.25.2.2",
                "secondaryAddress": "5885",
                "methods": [
                  "get",
                  "post"
                ]
              },
              "destAddr": {
                "network": "test2",
                "protocol": "MQ",
                "primaryAddress": "TEST_QM",
                "secondaryAddress": "TEST_QUEUE",
                "methods": []
              },
              "filter": {
                "filterType": "dpas",
                "dpasFilter": "dexter",
                "schemaPath": ""
              }
            },
            {
              "name": "Data_To_Shit",
              "srcAddr": {
                "network": "test",
                "protocol": "HTTP",
                "primaryAddress": "124.25.2.2",
                "secondaryAddress": "5885",
                "methods": [
                  "post"
                ]
              },
              "destAddr": {
                "network": "test2",
                "protocol": "MQ",
                "primaryAddress": "TEST_QM",
                "secondaryAddress": "TEST_QUEUE",
                "methods": []
              },
              "filter": {
                "filterType": "dpas",
                "dpasFilter": "dexter",
                "schemaPath": ""
              }
            }
          ]
        }} title="Overview" />} />
=======
        <Route path="/horizontal" component={HorizontalPage} />
>>>>>>> horizontalStepper
      </div>
    </Router>
  );
}

export default AppRouter;
