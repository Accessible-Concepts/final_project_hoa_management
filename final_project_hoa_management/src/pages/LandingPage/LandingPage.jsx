import React, { Component } from "react";
import "./LandingPage.css";
import Footer from "../../components/footer/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import SignupModal from "../../components/Signup/Modals/SignupModal";
import UserModel from "../../models/UserModel";
import Parse from "parse";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignupModal: false,
      users: []
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  handleClose() {
    this.setState({
      showSignupModal: false
    });
  }

  handleNewUser(newUser) {
    const User = Parse.Object.extend("User");
    const newParseUser = new User();
    newParseUser.set("email", newUser.email);
    newParseUser.set("password", newUser.password);
    newParseUser.set("fName", newUser.fName);
    newParseUser.set("lName", newUser.lName);
    newParseUser.set("address1", newUser.address1);
    newParseUser.set("address2", newUser.address2);
    newParseUser.set("city", newUser.city);
    newParseUser.set("state", newUser.state);
    newParseUser.set("zip", newUser.zip);
    newParseUser.set("country", newUser.country);
    newParseUser.set("phoneNumber", newUser.phoneNumber);
    newParseUser.set("isCommitteeMember", newUser.isCommitteeMember);

    newParseUser.save().then(
      theCreatedParseUser => {
        console.log("User created", theCreatedParseUser);
        this.setState({
          users: this.state.users.concat(new UserModel(theCreatedParseUser))
        });
      },
      error => {
        console.error("Error while creating User: ", error);
      }
    );
  }

  render() {
    const { showSignupModal } = this.state;
    const { activeUser } = this.props;

    if (activeUser) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="landing-page">
        <Container fluid className="lp-cont">
          <Row>
            <Col lg="7" className="lp-col">
              <div className="dashboard-title">
                Homeowner Association Management System
              </div>
              <div className="dashboard-text">
                The HOA Management System is the place where home or condo
                owners can discuss important issues, vote on various
                initiatives, participate in group chat or form user interest
                groups. All important notifications go through, meaning everyone
                is connected.
              </div>
              <Button variant="primary" href="#/login">
                Login
              </Button>
            </Col>
            <Col lg="5" className="lp-col">
              <img src={require("./images/3.jpg")} alt="Logo" width="500"></img>
            </Col>
          </Row>
          <SignupModal
            show={showSignupModal}
            handleClose={this.handleClose}
            handleNewUser={this.handleNewUser}
          />
        </Container>
        <Footer />
      </div>
    );
  }
}
