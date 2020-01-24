import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class MainNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHome: false
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    // This eventually calls the handleLogout method of the App component
    this.props.handleLogout();

    this.setState({
      redirectToHome: true
    });
  }

  componentDidUpdate() {
    if (this.state.redirectToHome) {
      this.setState({
        redirectToHome: false
      });
    }
  }

  render() {
    const { redirectToHome } = this.state;
    const { activeUser } = this.props;

    if (redirectToHome) {
      return <Redirect to="/" />;
    }

    const dashboardLink = activeUser ? (
      <Nav.Link href="#/dashboard">Dashboard</Nav.Link>
    ) : null;
    const tenantsLink = activeUser ? (
      <Nav.Link href="#/tenants">Tenants</Nav.Link>
    ) : null;
    const messagesLink = activeUser ? (
      <Nav.Link href="#/messages">Messages</Nav.Link>
    ) : null;
    const issuesLink = activeUser ? (
      <Nav.Link href="#/issues">Issues</Nav.Link>
    ) : null;
    const votingLink = activeUser ? (
      <Nav.Link href="#/voting">Voting</Nav.Link>
    ) : null;
    const signupLink = !activeUser ? (
      <Nav.Link href="#/signup">Signup</Nav.Link>
    ) : null;
    const loginLink = !activeUser ? (
      <Nav.Link href="#/login">Login</Nav.Link>
    ) : null;
    const logoutLink = activeUser ? (
      <Nav.Link onClick={this.logout}>Logout</Nav.Link>
    ) : null;

    // const tenantsLink = activeUser.isCommitteeMember ? (
    //   <Nav.Link href="#/tenants">Tenants</Nav.Link>
    // ) : null;
    console.log(activeUser);
    return (
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="#/">HOA Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {dashboardLink}
            {tenantsLink}
            {messagesLink}
            {issuesLink}
            {votingLink}
          </Nav>
          <Nav>
            {signupLink}
            {loginLink}
            {logoutLink}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
