import React, { Component } from "react";
import "./DashboardPage.css";
// import { Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import ClockComponent from "../../components/clock/ClockComponent";
import { Container } from "react-bootstrap";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { activeUser } = this.props;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="dashboard-page">
        <div className="db-clock">
          <ClockComponent name={activeUser.fName} />
        </div>

        <Container fluid className="db-cont">
          Dashboard
        </Container>
      </div>
    );
  }
}
