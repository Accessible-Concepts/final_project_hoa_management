import React, { Component } from "react";
import "./DashboardPage.css";
// import { Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
// import IssuesPage from "../../pages/IssuesPage/IssuesPage";
import { Container, Row, Col } from "react-bootstrap";

export default class DashboardPageCommitte extends Component {
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
        <Container fluid className="db-cont">
          <Row className="dashboard-first-row">
            <Col className="dashboard-col dashboard-first-col">
              <div className="dashboard-first-col-title">
                <h4>New Reported Issues</h4>
                <div className="dashboard-counter">counter</div>
              </div>
              {/* <IssuesPage /> */}
            </Col>
            <Col className="dashboard-col">
              <div className="dashboard-first-col-title">
                <h4>Overdue Issues</h4>
                <div className="dashboard-counter">counter</div>
              </div>
            </Col>
          </Row>
          <Row className="dashboard-second-row">
            <Col>
              <h4>Active Voting Percentage</h4>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
