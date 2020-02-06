import React, { Component } from "react";
import "./VotingComponent.css";
import EditVotingModal from "../../components/Voting/Modals/EditVotingModal";
import {
  Card,
  Accordion,
  Row,
  Col,
  ButtonToolbar,
  Button,
  Form
} from "react-bootstrap";
import Select from "react-select";

import Parse from "parse";
import DateTimePicker from "react-datetime-picker";

export default class VotingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditVotingModal: false,
      input: "",
      newComment: "",
      readVotingState: false,
      updateVotingVoteddBy: [],
      comments: []
      // date: new Date()
    };
  }

  componentDidMount() {
    const { voting } = this.props;
    let votingDueDate = voting.dueDate;
    let currentDate = new Date();
    console.log(votingDueDate);
    console.log(currentDate);
    let chechDueDate;
    if (votingDueDate > currentDate) {
      chechDueDate = true;
      voting.isActive = chechDueDate;
      const Voting = Parse.Object.extend("Voting");
      const query = new Parse.Query(Voting);
      // here you put the objectId that you want to update
      query.get(voting.id).then(object => {
        object.set("isActive", chechDueDate);

        object.save().then(
          response => {
            // You can use the "get" method to get the value of an attribute
            // Ex: response.get("<ATTRIBUTE_NAME>")

            console.log("Updated Voting", response);
          },
          error => {
            console.error("Error while updating Voting", error);
          }
        );
      });
    } else if (votingDueDate <= currentDate) {
      chechDueDate = false;
      voting.isActive = chechDueDate;
      const Voting = Parse.Object.extend("Voting");
      const query = new Parse.Query(Voting);
      // here you put the objectId that you want to update
      query.get(voting.id).then(object => {
        object.set("isActive", chechDueDate);

        object.save().then(
          response => {
            // You can use the "get" method to get the value of an attribute
            // Ex: response.get("<ATTRIBUTE_NAME>")

            console.log("Updated Voting", response);
          },
          error => {
            console.error("Error while updating Voting", error);
          }
        );
      });
    }

    console.log(chechDueDate);
  }

  onChangeHandler = ev => {
    this.setState({ input: ev.target.value });
    console.log("this.state.input: " + this.state.input);
  };

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  // onChangeDate = date => this.setState({ date });

  changeReadVotingState = voting => {
    const activeUserId = this.props.activeUser.id;

    const { votings } = this.state;

    // console.log("issueReaBydParse", issueReadBydParse);

    if (voting.readByUser === undefined) {
      voting.readByUser = [activeUserId];
    } else if (voting.readByUser.includes(activeUserId)) {
    } else {
      voting.readByUser = voting.readByUser.concat(activeUserId);
    }
    this.setState({
      //TODO: check with Nir how to fix the setState voting
      votings: votings
    });

    const Voting = Parse.Object.extend("Voting");
    const query = new Parse.Query(Voting);
    // here you put the objectId that you want to update
    query.get(voting.id).then(object => {
      object.set("readByUser", voting.readByUser);
      object.save().then(
        response => {
          console.log("Voting read", response);
        },
        error => {
          console.error("Error while reading Voting", error);
        }
      );
    });
  };

  handleClose = () => {
    this.setState({
      showEditVotingModal: false
    });
  };

  handleNewComment = (newComment, voting) => {
    console.log(voting);
    const Voting = Parse.Object.extend("Voting");
    const query = new Parse.Query(Voting);
    // here you put the objectId that you want to update
    query.get(voting.id).then(object => {
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

  addComment(event, voting) {
    const { input } = this.state;
    const newComment = input;

    //   // Function that is triggered only by the Enter key
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleNewComment(newComment, voting);
      //     //     // console.log(this.state.list)
    }
  }

  render() {
    const { voting, activeUser } = this.props;
    const { showEditVotingModal, input } = this.state;

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
    let activeImage;
    if (voting.isActive === true) {
      activeImage = require("./images/green-circle.png");
    } else if (voting.isActive === false) {
      activeImage = require("./images/red-circle.png");
    }

    // sets read/unread class to issues
    let readClass = "voting-title-unread";
    if (voting.readByUser === undefined) {
    } else if (voting.readByUser.includes(this.props.activeUser.id)) {
      readClass = "voting-title-read";
    } else readClass = "voting-title-unread";

    // const votingDuedate = activeUser.isCommitteeMember ? (
    //   <DateTimePicker onChange={this.onChangeDate} value={voting.dueDate} />
    // ) : (
    //   voting.dueDate.toLocaleString()
    // );

    const votingResultsGraphTitle = activeUser.isCommitteeMember ? (
      "Results"
    ) : (
      <div className="tenant-vote">
        <div>Your vote:</div>
        <div className="vote-select">
          <Select
            className="vote-select"
            onChange={this.handleSelectChange}
            options={this.props.voting.options}
            placeholder="Filter by Priority"
            // defaultValue={{ label: "Clear Filter", value: "" }}
          />
        </div>
      </div>
    );
    const graph1 = activeUser.isCommitteeMember ? "graph1" : null;

    const votingResultsPercentage = activeUser.isCommitteeMember ? (
      "Voting Percentage"
    ) : (
      <button>Button</button>
    );
    const graph2 = activeUser.isCommitteeMember ? "graph2" : null;

    console.log(activeUser);
    return (
      <Card className="voting-comp">
        <Accordion.Toggle
          as={Card.Header}
          eventKey={this.props.ind}
          className={readClass}
          onClick={() => {
            const changeReadVotingState = this.changeReadVotingState;
            changeReadVotingState(voting);
          }}
        >
          <div className="voting-title">
            {this.props.voting.title}
            <span className="voting-createdat">
              Created at {voting.createdAt.toLocaleString()}
            </span>
          </div>
          <div>
            <img
              src={activeImage}
              alt="Issue priority icon"
              height="25px"
            ></img>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.ind}>
          <Card.Body>
            <Row style={styles.row}>
              <Col>
                <Row className="voting-first-row">
                  <Col lg="2">Details: </Col>
                  <Col lg="10">{voting.details}</Col>
                </Row>
                <Row>
                  <Col lg="2">End Date: </Col>
                  <Col lg="10">
                    {voting.dueDate && voting.dueDate.toLocaleString()}
                  </Col>
                </Row>
              </Col>
              <Col lg="2" className="graph results-graph">
                <div className="voting-first-row">
                  {votingResultsGraphTitle}
                </div>
                <div>{graph1}</div>
              </Col>
              <Col lg="2" className="graph">
                <div className="voting-first-row">
                  {votingResultsPercentage}
                </div>
                <div>{graph2}</div>
              </Col>
              <Col lg="2" className="graph">
                <div className="voting-first-row">
                  {votingResultsPercentage}
                </div>
                <div>{graph2}</div>
              </Col>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
        <showEditVotingModal
          show={showEditVotingModal}
          handleClose={this.handleClose}
          handleEditVoting={this.handleEditVoting}
          Voting={this.props.voting}
        />
      </Card>
    );
  }
}
