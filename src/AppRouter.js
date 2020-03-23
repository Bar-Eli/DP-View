import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewRoutePage from "./Components/NewMPGWForm/NewRoutePage";
import NewRulePage from "./Components/NewRuleForm/NewRulePage";
import EditRuleStepper from "./Components/EditRuleForm/EditRules";
import DynamicTable from "./Components/DynamicTable";

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={NewRoutePage} />
        {/* <Route path="/addRule" component={NewRulePage} /> */}
        <Route path="/editRule" component={EditRuleStepper} />
        <Route path="/table" component={DynamicTable} />
      </div>
    </Router>
  );
}

export default AppRouter;
