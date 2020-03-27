import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleReactValidator from 'simple-react-validator';

class DpcredentialsPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.status,
            usernameTouched: false,
            passwordTouched: false, 
        };
        this.validator = new SimpleReactValidator();
        this.validator.message('Username', this.props.credentials.username, 'required');
        this.validator.message('Password', this.props.credentials.password, 'required');
      }

    continue = () =>
    {
        if(this.validator.allValid())
        {   
            this.props.handleClose();
            this.props.nextStep();
        }
        else
        {
            this.setState({ 
                usernameTouched: true,
                passwordTouched: true
            });
        }
    };

  render(){
    return (
        <div>
          <Dialog open={this.props.status} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Credentials</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter username and password for the chosen cluster.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                value={this.props.credentials.username}
                label="Username"
                type="text"
                fullWidth
                onChange={e => {
                    this.props.updateParams(
                      e.target.value,
                      "username",
                      "dpCredentials"
                    );
                    this.setState({ usernameTouched: true });
                    this.validator.message('Username', e.target.value, 'required');
                  } 
                }
                error ={!this.validator.fieldValid('Username') && this.state.usernameTouched === true}
                helperText={this.validator.getErrorMessages()["Username"]}
              />
              <TextField
                margin="dense"
                value={this.props.credentials.password}
                label="Password"
                type="password"
                fullWidth
                onChange={e => {
                    this.props.updateParams(
                      e.target.value,
                      "password",
                      "dpCredentials"
                    );
                    this.setState({ passwordTouched: true });
                    this.validator.message('Password', e.target.value, 'required');
                  } 
                }
                error ={!this.validator.fieldValid('Password') && this.state.passwordTouched === true}
                helperText={this.validator.getErrorMessages()["Password"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.continue} color="primary">
                Continue
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }

export default DpcredentialsPopup;
