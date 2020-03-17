import React from 'react';
import './HomePage.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toastState: false,
        };
    };



    render() {

        return (

            <div>
                <Button variant="contained" color="primary">Primary</Button>
            </div>

        );
    }

}

export default HomePage;