import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
// import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import TenantsPage from "./pages/TenantsPage/TenantsPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import IssuesPage from "./pages/IssuesPage/IssuesPage";
import VotingPage from "./pages/VotingPage/VotingPage";
import "./App.css";
// import jsonUsers from "./data/usersData";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUser: null
      // allUsers: jsonUsers
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(user) {
    this.setState({
      activeUser: user
    });
    console.log(this.state.activeUser);
  }

  handleLogout() {
    this.setState({
      activeUser: null
    });
  }

  render() {
    const { activeUser } = this.state;

    return (
      <div className="app">
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
          {/* <Route exact path="/signup">
            <SignupPage />
          </Route> */}
          <Route exact path="/dashboard">
            <DashboardPage
              activeUser={activeUser}
              handleLogout={this.handleLogout}
            />
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
            <VotingPage
              activeUser={activeUser}
              handleLogout={this.handleLogout}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}
