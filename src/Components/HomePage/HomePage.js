import React from "react";
import "./HomePage.css";
import Button from "@material-ui/core/Button";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toastState: false
    };
  }

  render() {
    return (
      <div>
        <h1>DP-View</h1>
      </div>
    );
  }
}

export default HomePage;
