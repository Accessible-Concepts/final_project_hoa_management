import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./LoginPage.css";
import Parse from "parse";
import UserModel from "../../models/UserModel";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "liorhasson@gmail.com",
      password: "123",
      showInvalidLoginError: false,
      redirectToDashboard: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  login() {
    const { handleLogin } = this.props;
    const { email, password } = this.state;
    // Pass the username and password to logIn function

    // const newActiveUser = allUsers.find(
    //   user =>
    //     user.email.toLowerCase() === email.toLowerCase() &&
    //     user.password === password
    // );

    Parse.User.logIn(email, password)
      .then(parseUser => {
        // Do stuff after successful login
        const user = new UserModel(parseUser);
        console.log("Logged in user", user);

        // console.log("newActiveUser: " + newActiveUser.fName);

        // if (newActiveUser) {
        // 1) Updating App component on the new active user
        // handleLogin(newActiveUser);
        handleLogin(user);
        // handleLogin(user);

        // 2) navigate to dashboard
        this.setState({
          redirectToDashboard: true
        });
        // } else {
      })
      .catch(error => {
        console.error("Error while logging in user", error);
        this.setState({
          showInvalidLoginError: true
        });
      });
  }

  render() {
    const {
      email,
      password,
      showInvalidLoginError,
      redirectToDashboard
    } = this.state;

    if (redirectToDashboard) {
      return <Redirect to="/dashboard" />;
    }

    const errorAlert = showInvalidLoginError ? (
      <Alert variant="danger">Invalid email or password!</Alert>
    ) : null;

    return (
      <div className="login-page">
        <div className="login-box">
          <h1>Login to HOA Management System</h1>
          <p>
            or <Link to="/signup">create a new account</Link>
          </p>
          {errorAlert}
          <Form className="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="input-title">Email address</Form.Label>
              <Form.Control
                name="email"
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="input-title">Password</Form.Label>
              <Form.Control
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={this.login}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
