import React, { Component } from "react";
import "./IssueComponent.css";
import EditIssueModal from "../Issues/Modals/EditIssueModal";
// import CommentModel from "../../models/CommentModel";
import {
  Card,
  Accordion,
  Row,
  Col,
  ButtonToolbar,
  Button,
  Form
} from "react-bootstrap";
import Parse from "parse";
import Switch from "react-switch";

export default class IssueComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditIssueModal: false,
      input: "",
      newComment: "",
      readIssueState: false,
      updateIssueReadBy: [],
      comments: [],
      checked: this.props.issue.issueActive
    };
  }

  onChangeHandler = ev => {
    this.setState({ input: ev.target.value });
    console.log("this.state.input: " + this.state.input);
  };

  handleSwitchChange = checked => {
    let issue = this.props.issue;
    this.setState({ checked });
    console.log("this.state.checked: " + checked);
    issue.issueActive = checked;
    // console.log(this.props.issue.issueActive);

    const Issue = Parse.Object.extend("Issue");
    const query = new Parse.Query(Issue);
    // here you put the objectId that you want to update
    query.get(issue.id).then(
      obj => {
        obj.set("issueActive", issue.issueActive);

        obj.save().then(
          response => {
            // You can use the "get" method to get the value of an attribute
            // Ex: response.get("<ATTRIBUTE_NAME>")

            console.log("Updated Issue", response);
          },
          error => {
            console.error("Error while updating Issue", error);
          }
        );
      },
      error => {
        console.error("Error w222hile updating Issue", error);
      }
    );
  };

  // handleIssueStatusChange = ev => {
  //   console.log("hello");
  // };

  changeReadIssueState = issue => {
    // console.log(issue.id);
    const activeUserId = this.props.activeUser.id;

    const { issues } = this.state;

    // console.log("issueReaBydParse", issueReadBydParse);

    if (issue.readByUser === undefined) {
      issue.readByUser = [activeUserId];
    } else if (issue.readByUser.includes(activeUserId)) {
    } else {
      issue.readByUser = issue.readByUser.concat(activeUserId);
    }
    //TODO: Ask Nir
    // const cloneIssues = [...issues];
    this.setState({
      issues: issues
      // issues: cloneIssues
    });

    const Issue = Parse.Object.extend("Issue");
    const query = new Parse.Query(Issue);
    // here you put the objectId that you want to update
    query.get(issue.id).then(object => {
      object.set("readByUser", issue.readByUser);
      object.save().then(
        response => {
          console.log("Issue read", response);
        },
        error => {
          console.error("Error while reading Issue", error);
        }
      );
    });
  };

  handleClose = () => {
    this.setState({
      showEditIssueModal: false
    });
  };

  handleNewComment = (newComment, issue) => {
    console.log(issue);
    const Issue = Parse.Object.extend("Issue");
    const query = new Parse.Query(Issue);
    // here you put the objectId that you want to update
    query.get(issue.id).then(object => {
      object.set("comments", newComment);
      object.save().then(
        console.log(newComment)
        // Issue => {
        //   console.log("Issue created", theCreatedParseIssue);
        //   this.setState({
        //     issues: this.state.issues.concat(
        //       new IssueModel(theCreatedParseIssue)
        //     )
        //   });
        // },
        // error => {
        //   console.error("Error while creating Issue: ", error);
        // }
      );
    });
  };

  addComment(event, issue) {
    const { input } = this.state;
    const newComment = input;

    //   // Function that is triggered only by the Enter key
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleNewComment(newComment, issue);
      //     //     // console.log(this.state.list)
    }
  }

  render() {
    const { issue, activeUser } = this.props;
    const { showEditIssueModal, input } = this.state;

    const styles = {
      row: {
        marginLeft: 0,
        marginRight: 0
      },
      col: {
        paddingLeft: 15,
        paddingRight: 15
      }
    };

    // adds important/information icon to each issue according to its priority
    let priorityImage;
    // let priorityImageTooltip;

    if (issue.selectedOption.value === "Normal") {
      priorityImage = require("./images/green-circle.png");
    } else if (issue.selectedOption.value === "Important") {
      priorityImage = require("./images/yellow-circle.png");
    } else if (issue.selectedOption.value === "Urgent") {
      priorityImage = require("./images/red-circle.png");
    }

    // if (issue.selectedOption.value === "Normal") {
    //   priorityImageTooltip = "Normal Priority Issue";
    // } else if (issue.selectedOption.value === "Important") {
    //   priorityImageTooltip = "Important Priority Issue";
    // } else if (issue.selectedOption.value === "Urgent") {
    //   priorityImageTooltip = "Urgent Priority Issue";
    // }

    // sets read/unread class to issues
    let readClass = "issue-title-unread";
    if (issue.readByUser === undefined) {
    } else if (issue.readByUser.includes(this.props.activeUser.id)) {
      readClass = "issue-title-read";
    } else readClass = "issue-title-unread";

    //Checks if an active issue is overdue
    const currentDate = new Date();
    const issueCreateat = issue.createdAt;
    const overdue = Math.floor(
      (currentDate - issueCreateat) / (1000 * 60 * 60 * 24)
    );

    if (issue.issueActive && overdue >= 4) {
      issue.isOverdue = true;
    } else issue.isOverdue = false;

    const isOverdue = issue.isOverdue ? "Issue is overdue" : null;

    // const cloneIssues = this.state.issues;
    // this.setState({
    //   issues: this.state.issues
    // issues: cloneIssues
    // });

    // TODO: Check how to update Parse and state with overdue issues
    // const Issue = Parse.Object.extend("Issue");
    // const query = new Parse.Query(Issue);
    // // here you put the objectId that you want to update
    // query.get(issue.id).then(object => {
    //   object.set("isOverdue", issue.isOverdue);
    //   object.save().then(
    //     response => {
    //       console.log("Issue isOverdue updated", response);
    //     },
    //     error => {
    //       console.error("Error while updating Issue isOverdue", error);
    //     }
    //   );
    // });

    // sets resolved class to issues
    let issueStatus;

    if (!issue.issueActive) {
      readClass += " resolved";
      issueStatus = "Resolved Issue";
    } else issueStatus = "Active issue";

    let showEditDeleteIssue;

    if (issue.createdBy.id === activeUser.id || activeUser.isCommitteeMember) {
      showEditDeleteIssue = (
        <Col className="comment-buttons">
          <div className="font-bold">{issueStatus}</div>
          <div>
            <Switch
              checked={this.state.checked}
              onChange={this.handleSwitchChange}
              onColor="#86d3ff"
              onHandleColor="#007BFF"
              handleDiameter={25}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={80}
              className="react-switch"
              id="material-switch"
            />
          </div>
          <div>
            <ButtonToolbar>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  this.setState({ showEditIssueModal: true });
                }}
              >
                Update
              </Button>
              <Button
                className="issue-delete-btn"
                type="button"
                variant="danger"
                size="sm"
                onClick={() => {
                  const deleteIssue = this.props.deleteIssue;
                  deleteIssue(issue.id);
                  console.log(issue.id);
                }}
              >
                Delete
              </Button>
            </ButtonToolbar>
          </div>
        </Col>
      );
    } else showEditDeleteIssue = null;

    return (
      <Card className="issue-comp">
        <Accordion.Toggle
          as={Card.Header}
          eventKey={this.props.ind}
          className={readClass}
          onClick={() => {
            const changeReadIssueState = this.changeReadIssueState;
            changeReadIssueState(issue);
            // console.log(issue);
          }}
        >
          <div className="issue-title">
            {this.props.issue.title}
            <span className="issue-createdat">
              Created at {issue.createdAt.toLocaleString()}
            </span>
            <span className="issue-overdue">{isOverdue}</span>
          </div>
          <div>
            <img
              src={priorityImage}
              alt="Issue priority icon"
              height="25px"
            ></img>
            {/* <div className="tooltip">
              abcbcbcb
              <span className="tooltiptext">{priorityImageTooltip}</span>
            </div> */}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.ind}>
          <Card.Body>
            <Row style={styles.row}>
              <Col lg="6" style={styles.col}>
                <Row>
                  <Col lg="3">
                    <Card.Img variant="top" src={issue.img} />
                  </Col>
                  <Col lg="9" style={styles.col} className="issue-mid-col">
                    <Row style={styles.row} className="issue-row">
                      <Col lg="3" style={styles.col}>
                        Details:
                      </Col>
                      <Col lg="9" style={styles.col}>
                        {issue.details}
                      </Col>
                    </Row>
                    <Row style={styles.row}>
                      <Col lg="3" style={styles.col}>
                        Priority:
                      </Col>
                      <Col lg="9" style={styles.col}>
                        {issue.priority}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              {/* //TODO: gdgdf */}
              <Col lg="6" style={styles.col}>
                <Row style={styles.row}>
                  <Col lg="8">
                    <div>Comments: </div>
                    <div className="issue-comments">{issue.comments}</div>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows="2"
                          className="comment-textArea"
                          value={input}
                          onChange={this.onChangeHandler}
                          onKeyUp={this.addComment(issue)}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  {showEditDeleteIssue}
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
        <EditIssueModal
          show={showEditIssueModal}
          handleClose={this.handleClose}
          handleEditIssue={this.handleEditIssue}
          issue={this.props.issue}
        />
      </Card>
    );
  }
}
