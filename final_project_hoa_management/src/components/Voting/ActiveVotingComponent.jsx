import React, { Component } from "react";
import "./ActiveVotingPage.css";
import VotingComponent from "../../components/Voting/VotingComponent";
import { Accordion, Container, Row, Button } from "react-bootstrap";
import MainNavbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";
import NewVotingModal from "../../models/NewVotingModal";
import { Redirect } from "react-router-dom";
import VotingModel from "../../models/VotingModel";
import Parse from "parse";

export default class ActiveVotingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewVotingModal: false,
      votings: []
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleNewVoting = this.handleNewVoting.bind(this);
  }

  componentDidMount() {
    if (this.props.activeUser) {
      const Voting = Parse.Object.extend("Voting");
      const query = new Parse.Query(Voting);
      // query.equalTo("userId", Parse.User.current());
      query.find().then(
        parseVotings => {
          const votings = parseVotings.map(
            parseVoting => new VotingModel(parseVoting)
          );
          this.setState({ votings });
        },
        error => {
          console.error("Error while fetching voting", error);
        }
      );
    }
    console.log(this.state.votings);
  }

  handleClose() {
    this.setState({
      showNewVotingModal: false
    });
  }

  handleNewVoting(newVoting) {
    this.props.handleNewVoting(newVoting);
  }

  render() {
    const { showNewVotingModal, votings } = this.state;
    const { activeUser, handleLogout } = this.props;
    console.log("activeUser:" + activeUser);

    const votingsComp = votings.map((voting, index) => (
      <VotingComponent ind={index} key={index} voting={voting} />
    ));

    console.error(votingsComp);
    //  console.log(votingsComp);

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="voting-page">
        <MainNavbar activeUser={activeUser} handleLogout={handleLogout} />
        <Container fluid className="vp-cont">
          <Row>
            <row className="voting-page-title"> Active Votings</row>
            <row className="btn-input-row">
              <Button
                size="sm"
                onClick={() => {
                  this.setState({ showNewVotingModal: true });
                }}
              >
                New Voting
              </Button>
            </row>
            <Row>
              <Accordion defaultActiveKey="1">{votingsComp}</Accordion>
            </Row>
          </Row>
          <NewVotingModal
            show={showNewVotingModal}
            handleClose={this.handleClose}
            handleNewVoting={this.handleNewVoting}
          />
        </Container>
        <Footer />
      </div>
    );
  }
}
