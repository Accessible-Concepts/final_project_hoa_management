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
import SwitchButton from "../Switch";
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
      checked: false
    };
  }

  // async componentDidMount() {
  //   const { activeUser } = this.props;
  //   console.log(activeUser);

  //   if (activeUser) {
  //     const Issue = Parse.Object.extend("Issue");
  //     const query = new Parse.Query(Issue);
  //     query.equalTo("community", activeUser.community);
  //     const parseIssues = await query.find();
  //     const issues = parseIssues.map(parseIssue => new IssueModel(parseIssue));
  //     this.setState({ issues });

  //     const Comment = Parse.Object.extend("Comment");
  //     const query = new Parse.Query(Comment);
  //     query.equalTo("forIssue", new Parse.Object("Issue"));
  //     query.find().then(
  //       results => {
  //         // You can use the "get" method to get the value of an attribute
  //         // Ex: response.get("<ATTRIBUTE_NAME>")
  //         console.log("Comment found", results);
  //       },
  //       error => {
  //         console.error("Error while fetching Comment", error);
  //       }
  //     );
  //   }
  // }

  onChangeHandler = ev => {
    this.setState({ input: ev.target.value });
    console.log("this.state.input: " + this.state.input);
  };

  handleChange = checked => {
    this.setState({ checked });
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
    let priorityImage;
    if (issue.selectedOption.value === "Normal") {
      priorityImage = require("./images/green-circle.png");
    } else if (issue.selectedOption.value === "Important") {
      priorityImage = require("./images/yellow-circle.png");
    } else if (issue.selectedOption.value === "Urgent") {
      priorityImage = require("./images/red-circle.png");
    }

    // sets read/unread class to issues
    let readClass = "issue-title-unread";
    if (issue.readByUser === undefined) {
    } else if (issue.readByUser.includes(this.props.activeUser.id)) {
      readClass = "issue-title-read";
    } else readClass = "issue-title-unread";

    // sets resolved class to issues
    let issueStatus = "";

    if (!issue.issueActive) {
      readClass += " resolved";
      issueStatus = "Resolved Issue";
    } else issueStatus = "Active issue";

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
            <img
              src={priorityImage}
              alt="Issue priority icon"
              height="25px"
            ></img>
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
                  <Col className="comment-buttons">
                    <div className="font-bold">{issueStatus}</div>
                    <div>
                      <Switch
                        checked={this.state.checked}
                        onChange={this.handleChange}
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
                        // checked={checked}  //TODO:keep
                        // onChange={this.handleChange} //TODO:keep
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
