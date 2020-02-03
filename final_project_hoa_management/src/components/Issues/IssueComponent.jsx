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

export default class IssueComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditIssueModal: false,
      input: "",
      newComment: "",
      readIssueState: false,
      updateIssueReadBy: []
    };
  }

  onChangeHandler = ev => {
    this.setState({ input: ev.target.value });
    console.log("this.state.input: " + this.state.input);
  };

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

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
    this.setState({
      //TODO: check with Nir how to fix the setState issue
      issues: issues
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
    const { issue } = this.props;
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
    // let priorityImage = "";
    // if (issue.selectedOption.value === "Important") {
    //   priorityImage = require("./images/exclamation.png");
    // } else {
    //   priorityImage = require("./images/info.png");
    // }

    // debugger;

    let readClass = "issue-title-unread";
    if (issue.readByUser === undefined) {
      readClass = "issue-title-unread";
    } else if (issue.readByUser.includes(this.props.activeUser.id)) {
      readClass = "issue-title-read";
    } else readClass = "issue-title-unread";

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
            {this.props.issue.title}{" "}
            <span className="issue-createdat">
              Created at {issue.createdAt.toLocaleString()}
            </span>
          </div>
          <div>
            {/* <img
              src={priorityImage}
              alt="Issue priority icon"
              width="25px"
            ></img> */}
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

              <Col style={styles.col} lg="6">
                <Row className="issue-row">
                  <div>Comments: {issue.comments}</div>
                </Row>
                <Row style={styles.row}>
                  <Col lg="8">
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
                  <Col className="comment-buttons">
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
                  </Col>
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
