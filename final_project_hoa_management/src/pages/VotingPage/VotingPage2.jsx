import React, { Component } from "react";
import "./VotingPage.css";
import VotingPage from "./VotingPage";

import { Redirect } from "react-router-dom";

export default class VotingPage2 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // const { showNewVotingModal, input, votings, selectedOption } = this.state;
    const { activeUser } = this.props;

    return (
      <div className="voting-pages">
        <VotingPage
          activeUser={activeUser}
          handleLogout={this.handleLogout}
          activeVotings={true}
        />
        <VotingPage
          activeUser={activeUser}
          handleLogout={this.handleLogout}
          activeVotings={false}
        />
      </div>
    );
  }
}
