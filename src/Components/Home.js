import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActions, Button, Container } from "@material-ui/core";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Word of the Day
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Container>
        );
    }
}

export default Home;
