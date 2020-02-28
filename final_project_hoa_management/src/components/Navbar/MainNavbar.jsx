import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./MainNavbar.css";
import ClockComponent from "../../components/clock/ClockComponent";

const MainNavbar = props => {
  const { activeUser, handleLogout } = props;
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    if (redirectToHome) {
      setRedirectToHome(false);
    }
  }, []);

  const logout = () => {
    // This eventually calls the handleLogout method of the App component
    handleLogout();
    setRedirectToHome(true);
  };

  // if (redirectToHome) {
  //   return <Redirect to="/" />;
  // }

  if (!activeUser) {
    return <Redirect to="/" />;
  }

  const dashboardLink = activeUser ? (
    <Nav.Link href="#/dashboard">Dashboard</Nav.Link>
  ) : null;
  const tenantsLink =
    activeUser && activeUser.isCommitteeMember ? (
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
    <Nav.Link onClick={logout}>Logout</Nav.Link>
  ) : null;

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="main-navbar">
      <Navbar.Brand href="#/dashboard">HOA Management System</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {dashboardLink}
          {tenantsLink}
          {messagesLink}
          {issuesLink}
          {votingLink}
        </Nav>
        <Nav className="navbar-right">
          <div className="greet-user">
            <ClockComponent activeUser={activeUser} />
          </div>
          {signupLink}
          {loginLink}
          {logoutLink}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
