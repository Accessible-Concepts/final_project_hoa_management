import React, { Component } from "react";
import "./DashboardPage.css";
import { Redirect } from "react-router-dom";
// import IssuesPage from "../../pages/IssuesPage/IssuesPage";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import IssueComponent from "../../components/Issues/IssueComponent";
import IssueModel from "../../models/IssueModel";

import Parse from "parse";

export default class DashboardPageCommitte extends Component {
  constructor(props) {
    super(props);

    this.state = { issues: [] };
  }

  async componentDidMount() {
    const { activeUser } = this.props;
    console.log(activeUser);

    if (activeUser) {
      const Issue = Parse.Object.extend("Issue");
      const query = new Parse.Query(Issue);
      query.equalTo("community", activeUser.community);
      const parseIssues = await query.find();
      const issues = parseIssues.map(parseIssue => new IssueModel(parseIssue));
      this.setState({ issues });
    }
  }

  render() {
    const { activeUser } = this.props;
    const { issues } = this.state;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    //Displays the new reported issues

    let unreadIssues = issues.filter(iss => {
      let boolResultofRead =
        iss.readByUser && iss.readByUser.includes(activeUser.id) ? false : true;
      return boolResultofRead;
    });

    const issuesView = unreadIssues.map((issue, index) => (
      <IssueComponent
        ind={index}
        key={issue.id}
        issue={issue}
        activeUser={activeUser}
        // editIssue={this.editIssue}
        deleteIssue={this.deleteIssue}
      />
    ));

    let dashNewIssuesDisp;
    if (unreadIssues.length === 0) {
      dashNewIssuesDisp = "There are no new reported issues";
    } else dashNewIssuesDisp = issuesView;

    //Displays the overdue issues

    let overdueIssues = issues.filter(iss => {
      let boolResultofOverdue = iss.isOverdue && iss.issueActive ? true : false;
      return boolResultofOverdue;
    });

    const overdueIssuesView = overdueIssues.map((issue, index) => (
      <IssueComponent
        ind={index}
        key={issue.id}
        issue={issue}
        activeUser={activeUser}
        // editIssue={this.editIssue}
        deleteIssue={this.deleteIssue}
      />
    ));

    let dashOverdueIssuesDisp;
    if (overdueIssues.length === 0) {
      dashOverdueIssuesDisp = "There are no overdue issues";
    } else dashOverdueIssuesDisp = overdueIssuesView;

    return (
      <div className="dashboard-page">
        <Container fluid className="db-cont">
          <Row className="dashboard-first-row">
            <Col className="dashboard-col dashboard-first-col">
              <div className="dashboard-col-title">
                <h4>New Reported Issues</h4>
                <div className="dashboard-counter">{unreadIssues.length}</div>
              </div>
              <div>
                <Accordion defaultActiveKey="1" className="issues-accord">
                  {dashNewIssuesDisp}
                </Accordion>
              </div>
            </Col>
            <Col className="dashboard-col">
              <div className="dashboard-col-title">
                <h4>Overdue Issues</h4>
                <div className="dashboard-counter">{overdueIssues.length}</div>
              </div>
              <div>
                <Accordion defaultActiveKey="1" className="issues-accord">
                  {dashOverdueIssuesDisp}
                </Accordion>
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
