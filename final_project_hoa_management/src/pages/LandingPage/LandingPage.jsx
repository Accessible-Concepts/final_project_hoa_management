import React, { Component } from "react";
import "./LandingPage.css";
import MainNavbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { activeUser } = this.props;

    if (activeUser) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="landing-page">
        <MainNavbar />

        <Container fluid className="lp-cont">
          <Row>
            <Col lg="7" className="lp-col">
              <div className="dashboard-title">
                Homeowner Association Management System
              </div>
              <div className="dashboard-text">
                Homeowner Association Management System Homeowner Association
                Management System Homeowner Association Management System
                Homeowner Association Management System Homeowner Association
                Management SystemHomeowner Association Management System
                Homeowner Association Management System
              </div>
              <Button variant="primary" href="#/login">
                Login
              </Button>
            </Col>
            <Col lg="5" className="lp-col">
              <img src={require("./images/3.jpg")} alt="Logo" width="500"></img>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
