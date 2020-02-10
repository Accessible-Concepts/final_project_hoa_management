import React, { Component } from "react";
import "./LandingPage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignupModal: false,
      users: []
    };
  }

  handleClose = () => {
    this.setState({
      showSignupModal: false
    });
  };

  render() {
    const { activeUser } = this.props;

    if (activeUser) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="landing-page">
        <Container fluid className="lp-cont">
          <Row>
            <Col lg="7" className="lp-col">
              <div className="dashboard-title">
                Homeowner Association Management System
              </div>
              <div className="dashboard-text">
                The HOA Management System is the place where home or condo
                owners can discuss important issues, vote on various
                initiatives, participate in group chat or form user interest
                groups. All important notifications go through, meaning everyone
                is connected.
              </div>
              {/* <button class="login-button" href="#/login">
                <span>Login </span>
              </button> */}

              <Button variant="primary" href="#/login">
                Login
              </Button>
            </Col>
            <Col lg="5" className="lp-col">
              <img src={require("./images/3.jpg")} alt="Logo" width="500"></img>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
