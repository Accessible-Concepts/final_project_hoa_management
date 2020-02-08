import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPageCommittee from "./pages/Dashboard/DashboardPageCommittee";
import DashboardPageTenant from "./pages/Dashboard/DashboardPageTenant";
import TenantsPage from "./pages/TenantsPage/TenantsPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import IssuesPage from "./pages/IssuesPage/IssuesPage";
import VotingPage2 from "./pages/VotingPage/VotingPage2";
import "./App.css";
import Parse from "parse";
import MainNavbar from "./components/navbar/MainNavbar";
import UserModel from "./models/UserModel";
import Footer from "./components/footer/Footer";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUser: Parse.User.current()
        ? new UserModel(Parse.User.current())
        : null
    };
    console.log("activeUser: ", this.state.activeUser);
  }

  handleLogin = parseCurrentUser => {
    this.setState({
      activeUser: parseCurrentUser
    });
    console.log("activeUser: ", this.state.activeUser);
  };

  handleLogout = () => {
    this.setState({
      activeUser: null
    });
    Parse.User.logOut().then(() => {
      const parseCurrentUser = Parse.User.current();
      console.log("parseCurrentUser: ", parseCurrentUser);
    });
    console.log("activeUser: ", this.state.activeUser);
  };

  render() {
    const { activeUser } = this.state;

    const dashboardPage =
      activeUser && activeUser.isCommitteeMember ? (
        <DashboardPageCommittee
          activeUser={activeUser}
          handleLogout={this.handleLogout}
        />
      ) : (
        <DashboardPageTenant
          activeUser={activeUser}
          handleLogout={this.handleLogout}
        />
      );

    return (
      <div className="app">
        <MainNavbar
          className="main-navbar"
          activeUser={activeUser}
          handleLogout={this.handleLogout}
        />
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <LandingPage
                activeUser={activeUser}
                handleLogout={this.handleLogout}
              />
            </Route>
            <Route exact path="/login">
              <LoginPage handleLogin={this.handleLogin} />
            </Route>
            <Route exact path="/signup">
              <SignupPage handleLogin={this.handleLogin} />
            </Route>
            <Route exact path="/dashboard">
              {dashboardPage}
            </Route>
            <Route exact path="/tenants">
              <TenantsPage
                activeUser={activeUser}
                handleLogout={this.handleLogout}
              />
            </Route>
            <Route exact path="/messages">
              <MessagesPage
                activeUser={activeUser}
                handleLogout={this.handleLogout}
              />
            </Route>
            <Route exact path="/issues">
              <IssuesPage
                activeUser={activeUser}
                handleLogout={this.handleLogout}
              />
            </Route>
            <Route exact path="/voting">
              <VotingPage2
                activeUser={activeUser}
                handleLogout={this.handleLogout}
              />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
