import React, { Component } from "react";
import "./IssuesPage.css";
import Footer from "../../components/footer/Footer";
import IssueComponent from "../../components/Issues/IssueComponent";
import NewIssueModal from "../../components/Issues/Modals/NewIssueModal";

import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  Accordion
} from "react-bootstrap";
import IssueModel from "../../models/IssueModel";
import Parse from "parse";
import Select from "react-select";

export default class IssuesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewIssueModal: false,
      input: "",
      issues: [],
      selectedOption: { value: "", label: "Clear Priority Filter" },
      selectedSortOption: "date"
    };
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

  //Function that handles the input field changes
  onChangeHandler = ev => {
    this.setState({
      input: ev.target.value
    });
    // console.log("this.state.input: " + this.state.input);
  };

  //Function that handles the select field changes
  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`this.state.selectedOption: `, selectedOption);
  };

  //Function that handles the radio field changes
  handleSortChange = ev => {
    this.setState({
      selectedSortOption: ev.target.value
    });
    // console.log(
    // "this.state.handleSortChange: " + this.state.selectedSortOption
    // );
  };

  //Function that handles the modals components to close
  handleClose = () => {
    this.setState({
      showNewIssueModal: false,
      showEditIssueModal: false
    });
  };

  //Function that adds a new issue to the parse database
  //and to the issues state
  handleNewIssue = newIssue => {
    const { activeUser } = this.props;

    const Issue = Parse.Object.extend("Issue");
    const newParseIssue = new Issue();
    newParseIssue.set("title", newIssue.title);
    newParseIssue.set("details", newIssue.details);
    newParseIssue.set("priority", newIssue.selectedOption.value);
    newParseIssue.set("selectedOption", newIssue.selectedOption);
    newParseIssue.set(
      "image",
      new Parse.File(newIssue.fileImg.file.name, newIssue.fileImg.file)
    );

    newParseIssue.set("createdBy", Parse.User.current());
    newParseIssue.set("community", activeUser.community);
    newParseIssue.save().then(
      theCreatedParseIssue => {
        console.log("Issue created", theCreatedParseIssue);
        this.setState({
          issues: this.state.issues.concat(new IssueModel(theCreatedParseIssue))
        });
      },
      error => {
        console.error("Error while creating Issue: ", error);
      }
    );
  };

  //Function that deletes a new issue from the parse database
  // and from the issues state
  deleteIssue = issueId => {
    const Issue = Parse.Object.extend("Issue");
    const query = new Parse.Query(Issue);
    query.get(issueId).then(object => {
      object.destroy().then(
        issueDeleted => {
          console.log("Issue deleted", issueDeleted);
        },
        error => {
          console.error("Error while deleting Issue: ", error);
        }
      );
    });
    const { issues } = this.state;
    let issuesDel = issues;
    let issueDelId = issues.findIndex(
      issueToDelete => issueToDelete.id === issueId
    );

    issuesDel.splice(issueDelId, 1);
    // console.log(issuesDel);
    this.setState({
      issues: issuesDel
    });
  };

  render() {
    const { showNewIssueModal, input, issues, selectedOption } = this.state;
    const { activeUser } = this.props;

    const options = [
      { value: "", label: "Clear Priority Filter" },
      { value: "Normal", label: "Normal" },
      { value: "Important", label: "Important" },
      { value: "Urgent", label: "Urgent" }
    ];

    const styles = {
      row: {
        marginLeft: 0,
        marginRight: 0
      },
      col: {
        paddingLeft: 0,
        paddingRight: 0
      }
    };

    // Funxtion that filters the issues array according
    // to the text entered in the input field
    let inputFilteredIssues = issues.filter(iss => {
      let boolResultofTitle = iss.title
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      let boolResultofDetails = iss.details
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      return boolResultofTitle || boolResultofDetails;
    });

    // Funxtion that filters the issues array according to the
    // selectedOption (priority)
    let priorityFilteredIssues = inputFilteredIssues.filter(iss => {
      let boolResultofPriority = iss.priority.includes(
        this.state.selectedOption.value
      );
      return boolResultofPriority;
    });

    //Sorting the issues by date or by priority
    let sortedIssues = priorityFilteredIssues;
    if (this.state.selectedSortOption === "date") {
      sortedIssues = priorityFilteredIssues.sort(function(a, b) {
        return a.createdAt < b.createdAt;
      });
    } else if (this.state.selectedSortOption === "priority") {
      sortedIssues = priorityFilteredIssues.sort(function(a, b) {
        if (a.selectedOption.value < b.selectedOption.value) {
          return -1;
        } else if (a.selectedOption.value > b.selectedOption.value) {
          return 1;
        } else return 0;
      });
    }

    const issuesView = sortedIssues.map((issue, index) => (
      <IssueComponent
        ind={index}
        key={issue.id}
        issue={issue}
        activeUser={activeUser}
        editIssue={this.editIssue}
        deleteIssue={this.deleteIssue}
      />
    ));

    const community = this.props.activeUser.community;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="issues-page">
        <Container fluid className="i-cont">
          <Form.Group>
            <Row className="issue-input-row" style={styles.row}>
              <Col lg="7" style={styles.col}>
                <FormControl
                  placeholder="Filter issues by text in Title and Details"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={input}
                  onChange={this.onChangeHandler}
                />
              </Col>
              <Col lg="3" style={styles.col}>
                <Select
                  value={selectedOption}
                  onChange={this.handleSelectChange}
                  options={options}
                  placeholder="Filter by Priority"
                  className="iss-option-select"
                  // defaultValue={{ label: "Clear Filter", value: "" }}
                />
              </Col>
              <Col lg="2" className="issue-sort" style={styles.col}>
                <Form className="issue-radio-buttons">
                  <div>Sort by:&nbsp;&nbsp;</div>
                  {["radio"].map(type => (
                    <div key={`inline-${type}`} className="radio-btns">
                      <Form.Check
                        inline
                        label="Date"
                        type={type}
                        id={`inline-${type}-1`}
                        name="sort"
                        onChange={this.handleSortChange}
                        value="date"
                        checked={this.state.selectedSortOption === "date"}
                      />
                      <Form.Check
                        inline
                        label="Priority"
                        type={type}
                        id={`inline-${type}-2`}
                        name="sort"
                        onChange={this.handleSortChange}
                        value="priority"
                        checked={this.state.selectedSortOption === "priority"}
                      />
                    </div>
                  ))}
                </Form>
              </Col>
            </Row>
          </Form.Group>
          <Row className="btn-input-row" style={styles.row}>
            <div className="issue-title-table">
              Community: {community.get("community")}
            </div>{" "}
            <Button
              size="sm"
              onClick={() => {
                this.setState({ showNewIssueModal: true });
              }}
            >
              New Issue
            </Button>
          </Row>
          <Row style={styles.row}>
            <Accordion defaultActiveKey="1" className="my-accord">
              {issuesView}
            </Accordion>
          </Row>

          <NewIssueModal
            show={showNewIssueModal}
            handleClose={this.handleClose}
            handleNewIssue={this.handleNewIssue}
          />
        </Container>
        <Footer />
      </div>
    );
  }
}
