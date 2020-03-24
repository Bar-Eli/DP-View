import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewRoutePage from "./Components/NewMPGWForm/NewRoutePage";
import EditRuleStepper from "./Components/EditRuleForm/EditRules";
import HorizontalPage from "./Components/NewMPGWHorizontal/HorizontalPage";
// import HorizontalNonLinearAlternativeLabelStepper from "./Components/HorizontalStepper";

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={NewRoutePage} />
        {/* <Route path="/addRule" component={NewRulePage} /> */}
        <Route path="/editRule" component={EditRuleStepper} />
        <Route path="/horizontal" component={HorizontalPage} />
      </div>
    </Router>
  );
}

export default AppRouter;
