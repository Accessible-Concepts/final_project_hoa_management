import React, { Component } from "react";
import "./DashboardPage.css";
// import { Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Accordion } from "react-bootstrap";

export default class DashboardPageTenant extends Component {
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
              <div className="dashboard-col-title">
                <h4>New Messages</h4>
                <div className="dashboard-counter">
                  {/* {unreadIssues.length} */}
                </div>
              </div>
              <div>
                <Accordion defaultActiveKey="1" className="issues-accord">
                  {/* {dashNewIssuesDisp} */}
                </Accordion>
              </div>
            </Col>
            <Col className="dashboard-col">
              <div className="dashboard-col-title">
                <h4>Pending Votings</h4>
                <div className="dashboard-counter">
                  {/* {overdueIssues.length} */}
                </div>
              </div>
              <div>
                <Accordion defaultActiveKey="1" className="issues-accord">
                  {/* {dashOverdueIssuesDisp} */}
                </Accordion>
              </div>
            </Col>
          </Row>
          <Row className="dashboard-second-row">
            <Col className="dashboard-col">
              <div className="dashboard-col-title">
                <h4>Voting Results</h4>
              </div>
              <div>
                <Accordion defaultActiveKey="1" className="issues-accord">
                  {/* {dashOverdueIssuesDisp} */}
                </Accordion>
              </div>
            </Col>
            <Col className="dashboard-col">
              <div className="dashboard-col-title">
                <h4>New Issues</h4>
                <div className="dashboard-counter">
                  {/* {overdueIssues.length} */}
                </div>
              </div>
              <div>
                <Accordion defaultActiveKey="1" className="issues-accord">
                  {/* {dashOverdueIssuesDisp} */}
                </Accordion>
              </div>
            </Col>
            <Col className="dashboard-col">
              <div className="dashboard-col-title">
                <h4>New Resolved Issues</h4>
                <div className="dashboard-counter">
                  {/* {overdueIssues.length} */}
                </div>
              </div>
              <div>
                <Accordion defaultActiveKey="1" className="issues-accord">
                  {/* {dashOverdueIssuesDisp} */}
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
