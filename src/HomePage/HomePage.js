import React from "react";
import "./HomePage.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toastState: false
    };
  }

  showAlert = () => {
    alert("Trying to show the alert on screen");
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.showAlert}>
          Primary
        </Button>
      </div>
    );
  }
}

export default HomePage;
