import React, { Component } from "react";
import "./VotingComponent.css";
import EditVotingModal from "../../components/Voting/Modals/EditVotingModal";
import VoteModal from "../../components/Voting/Modals/VoteModal";
import {
  Card,
  Accordion,
  Row,
  Col,
  ButtonToolbar,
  Button
} from "react-bootstrap";
import Select from "react-select";
import { Pie } from "react-chartjs-2";

import Parse from "parse";

export default class VotingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditVotingModal: false,
      showVoteModal: false,
      input: "",
      newComment: "",
      readVotingState: false,
      updateVotingVoteddBy: [],
      comments: [],
      selectedOption: "",
      labelsArr: []
    };
  }

  componentDidMount() {
    const { voting } = this.props;
    let votingDueDate = voting.dueDate;
    let currentDate = new Date();
    // console.log(votingDueDate);
    // console.log(currentDate);
    let isActiveCheck;
    if (votingDueDate <= currentDate && voting.isActive) {
      //TODO: Ask Nir
      isActiveCheck = false;
      voting.isActive = isActiveCheck;
      const Voting = Parse.Object.extend("Voting");
      const query = new Parse.Query(Voting);
      // here you put the objectId that you want to update
      query.get(voting.id).then(object => {
        object.set("isActive", isActiveCheck);

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

    const Vote = Parse.Object.extend("Vote");
    const voteQuery = new Parse.Query(Vote);

    voteQuery.equalTo("votingId", voting.id);
    voteQuery.find().then(
      results => {
        // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")

        console.log("Vote found", results);
      },
      error => {
        console.error("Error while fetching Vote", error);
      }
    );
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
      showEditVotingModal: false,
      showVoteModal: false
    });
  };

  createVote = () => {
    const { selectedOption } = this.state;
    const { activeUser, voting } = this.props;
    const community = activeUser.community;
    const votedBy = activeUser.id;
    const votingId = voting.id;

    const newVote = {
      community,
      selectedOption,
      votedBy,
      votingId
    };
    this.handleNewVote(newVote);
    // this.setState({
    //   selectedOption: { label: "Information", value: "Information" },
    // });
  };

  handleNewVote = newVote => {
    // const { activeUser } = this.props;
    // const Vote = Parse.Object.extend("Vote");
    // const newParseVote = new Vote();
    // newParseVote.set("vote", newVote.vote);
    // newParseVote.set("selectedOption", selectedOption);
    // newParseVote.set("votingId", newVote.options);
    // newParseVote.set("createdBy", Parse.User.current());
    // newParseVote.set("community", activeUser.community);
    // newParseVote.save().then(
    //   theCreatedParseVote => {
    //     console.log("Vote created", theCreatedParseVote);
    //     this.setState({
    //       votings: this.state.votings.concat(new VoteModel(theCreatedParseVote))
    //     });
    //   },
    //   error => {
    //     console.error("Error while creating Vote: ", error);
    //   }
    // );
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
      // event.preventDefault();
      this.handleNewComment(newComment, voting);
      //     //     // console.log(this.state.list)
    }
  }

  getChartData(votes) {
    let votesData = [50, 50];

    // votes.forEach(vote => {
    //   if (vote.label === 1) {
    //     ++votesData[0];
    //   } else if (vote.label === 2) {
    //     ++votesData[1];
    //   }
    // };

    return {
      labels: this.props.voting.options,
      datasets: [
        {
          data: votesData,
          backgroundColor: ["#FF6384", "#36A2EB", "#36A22B"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#36A22B"]
        }
      ]
    };
  }

  render() {
    const { voting, activeUser } = this.props;
    const { showEditVotingModal, showVoteModal, selectedOption } = this.state;

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

    // Creates a an options labels array from voting.options
    let labelsArr = voting.options.map(item => {
      return item.label;
    });
    let labelsArrToString = labelsArr.join(", ");

    // let votesCount = [];
    // for (let i = 0; i < labelsArr; i++) {}

    var scoreArr = [30, 40, 30];

    const chartData = {
      labels: labelsArr,
      datasets: [
        {
          data: scoreArr,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    // adds important/information icon to each issue according to its priority
    let activeImage;
    if (voting.isActive === true) {
      activeImage = require("./images/green-circle.png");
    } else if (voting.isActive === false) {
      activeImage = require("./images/red-circle.png");
    }

    // let votedVotingIndicator;
    // if (voting.votedByUser === undefined && voting.isActive) {
    //   votedVotingIndicator = "Didn't Vote Yet";
    // } else if (
    //   voting.votedByUser &&
    //   voting.votedByUser.includes(this.props.activeUser.id) &&
    //   voting.isActive
    // ) {
    //   votedVotingIndicator = "Already Voted";
    // } else votedVotingIndicator = "Didn't Vote Yet";

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

    // const votingResultsGraphTitle =
    //   activeUser.isCommitteeMember && voting.isActive ? (
    //     "Results"
    //   ) : (
    //     <div className="tenant-vote">
    //       <div>Your vote:</div>
    //       <div className="vote-select">
    //         <Select
    //           className="vote-select"
    //           onChange={this.handleSelectChange}
    //           options={this.props.voting.options}
    //           placeholder="Vote options"
    //           // defaultValue={{ label: "Clear Filter", value: "" }}
    //         />
    //       </div>
    //     </div>
    //   );

    let votingResultsGraph;
    if (activeUser.isCommitteeMember && voting.isActive) {
      votingResultsGraph = (
        <Col lg="2" className="graph">
          <div className="voting-first-row">Voting Results</div>
          <Pie className="voting-chart" data={chartData} />
        </Col>
      );
    } else if (!voting.isActive) {
      votingResultsGraph = (
        <Col lg="2" className="graph">
          <div className="voting-first-row">Voting Results</div>
          <Pie className="voting-chart" data={chartData} />
        </Col>
      );
    }

    let votingPercentageGraph;
    if (activeUser.isCommitteeMember && voting.isActive) {
      votingPercentageGraph = (
        <Col lg="2" className="graph">
          <div className="voting-first-row">Voting Percentage</div>

          <Pie className="voting-chart" data={chartData} />
        </Col>
      );
    } else if (!voting.isActive) {
      votingPercentageGraph = (
        <Col lg="2" className="graph">
          <div className="voting-first-row">Voting Percentage</div>
          <Pie className="voting-chart" data={chartData} />
        </Col>
      );
    }

    let showUpdateDeleteVotingBtn;
    if (activeUser && activeUser.isCommitteeMember) {
      showUpdateDeleteVotingBtn = (
        <ButtonToolbar>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              this.setState({ showEditVotingModal: true });
            }}
            // handleClose={this.handleClose}
          >
            Update
          </Button>
          <Button
            className="messege-delete-btn"
            type="button"
            variant="danger"
            size="sm"
            onClick={() => {
              const deleteVoting = this.props.deleteVoting;
              deleteVoting(voting.id);
              console.log(voting.id);
            }}
          >
            Delete
          </Button>
        </ButtonToolbar>
      );
    } else showUpdateDeleteVotingBtn = null;

    let votedVotingIndicator;
    let votedByUserCheck;
    if (voting.votedByUser === undefined) {
      votedByUserCheck = true;
    } else if (voting.votedByUser.includes(this.props.activeUser.id)) {
      votedByUserCheck = false;
    } else votedByUserCheck = true;

    let showVoteBtn;
    if (voting.isActive && votedByUserCheck) {
      showVoteBtn = (
        <div className="vote-button-selection">
          <div>Your Vote:</div>
          <Select
            className="vote-select"
            value={selectedOption}
            onChange={this.handleSelectChange}
            options={voting.options}
          />
          <Button
            className="vote-btn"
            type="button"
            // variant=""
            size="sm"
            onClick={this.handleVote}
          >
            Vote
          </Button>
        </div>
      );
      votedVotingIndicator = "Didn't Vote Yet";
    } else if (voting.isActive && !votedByUserCheck) {
      showVoteBtn = null;
      votedVotingIndicator = "Already Voted";
    } else if (!voting.isActive && votedByUserCheck) {
      showVoteBtn = null;
      votedVotingIndicator = "Didn't Vote";
    } else {
      showVoteBtn = null;
      votedVotingIndicator = "Voted";
    }
    //   <div>
    //   <Button
    //     className="vote-btn"
    //     type="button"
    //     // variant=""
    //     size="sm"
    //     onClick={() => {
    //       this.setState({ showVoteModal: true });
    //     }}
    //   >
    //     Vote
    //   </Button>
    // </div>

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
          <div className="vote-indicator">{votedVotingIndicator}</div>
          <div>
            <img src={activeImage} alt="Voting status icon" height="25px"></img>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.ind}>
          <Card.Body>
            <Row style={styles.row}>
              <Col>
                <Row className="voting-first-row">
                  <Col lg="4">Details: </Col>
                  <Col lg="8">{voting.details}</Col>
                </Row>
                <Row className="voting-second-row">
                  <Col lg="4">Options: </Col>
                  <Col lg="8">>{labelsArrToString}</Col>
                </Row>
                <Row>
                  <Col lg="4">End Date: </Col>
                  <Col lg="8">
                    <div>
                      {voting.dueDate && voting.dueDate.toLocaleString()}
                    </div>
                  </Col>
                </Row>
              </Col>
              {votingResultsGraph}
              {votingPercentageGraph}
            </Row>
            <Row style={styles.row} className="voting-btns-row">
              <div className="voting-update-delete">
                {showUpdateDeleteVotingBtn}
              </div>
              {showVoteBtn}
            </Row>
          </Card.Body>
        </Accordion.Collapse>
        <VoteModal
          show={showVoteModal}
          handleClose={this.handleClose}
          handleEditVote={this.handleEditVote}
          Voting={voting}
        />

        <EditVotingModal
          show={showEditVotingModal}
          handleClose={this.handleClose}
          handleEditVoting={this.handleEditVoting}
          Voting={voting}
        />
      </Card>
    );
  }
}
