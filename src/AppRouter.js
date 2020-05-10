import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewRoutePage from "./Components/NewMPGWForm/NewRoutePage";
// import EditRuleStepper from "./Components/EditRuleForm/EditRules";
// import LogoNFL from "./Components/Logo/LogoNFL";
import EditRulesForm from "./Components/EditRulesForm/EditRulePage";
import { Navbar } from "./Components/Navbar";
import Home from "./Components/Home";


function AppRouter() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/new" exact component={NewRoutePage} />
                <Route path="/editRule" component={EditRulesForm} />
            </Switch>
        </Router>
    );
}

export default AppRouter;
