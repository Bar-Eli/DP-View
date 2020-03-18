import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewRoutePage from "./Components/NewMPGWForm/NewRoutePage";
import NewRulePage from "./Components/NewRuleForm/NewRulePage";
import EditRule from "./Components/EditRule";

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={NewRoutePage} />
        <Route path="/addRule" component={NewRulePage} />
        <Route path="/editRule" component={EditRule} />
      </div>
    </Router>
  );
}

export default AppRouter;
