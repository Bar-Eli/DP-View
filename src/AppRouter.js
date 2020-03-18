import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import HomePage from "./Components/HomePage";
import NewRoutePage from "./Components/NewMPGWForm/NewRoutePage";
import AddRule from "./Components/AddRule";
import EditRule from "./Components/EditRule";

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={NewRoutePage} />
        <Route path="/addRule" component={AddRule} />
        <Route path="/editRule" component={EditRule} />
      </div>
    </Router>
  );
}

export default AppRouter;
