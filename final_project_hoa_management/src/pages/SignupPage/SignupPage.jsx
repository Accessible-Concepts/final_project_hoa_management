import React, { Component } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import UserModel from "../../models/UserModel";
import "./SignupPage.css";
import Parse from "parse";
import { Redirect } from "react-router-dom";

export default class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      fName: "",
      lName: "",
      email: "",
      password: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phoneNumber: "",
      isCommitteeMember: "yes"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createUser() {
    const {
      fName,
      lName,
      email,
      password,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phoneNumber,
      isCommitteeMember
    } = this.state;

    const newUser = {
      fName,
      lName,
      email,
      password,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phoneNumber,
      isCommitteeMember
    };
    this.handleNewUser(newUser);
    // this.props.handleClose();
    this.setState({
      fName: "",
      lName: "",
      email: "",
      password: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phoneNumber: "",
      isCommitteeMember
    });
  }

  handleNewUser(newUser) {
    //  const User = Parse.Object.extend("User");
    const newParseUser = new Parse.User();
    newParseUser.set("username", newUser.email);
    newParseUser.set("fName", newUser.fName);
    newParseUser.set("lName", newUser.lName);
    newParseUser.set("email", newUser.email);
    newParseUser.set("password", newUser.password);
    newParseUser.set("address1", newUser.address1);
    newParseUser.set("address2", newUser.address2);
    newParseUser.set("city", newUser.city);
    newParseUser.set("state", newUser.state);
    newParseUser.set("zip", Number(newUser.zip));
    newParseUser.set("country", newUser.country);
    newParseUser.set("phoneNumber", newUser.phoneNumber);
    newParseUser.set("isCommitteMember", newUser.isCommitteeMember);

    newParseUser.signUp().then(signupResult => {
      console.log(signupResult);
      // <Redirect to="/login" />;
    });

    // .signup().then(newParseUser => {
    //     if (typeof document !== "undefined")
    //       document.write(`User signed up: ${JSON.stringify(newParseUser)}`);
    //     console.log("User signed up", newParseUser);
    //   })
    //   .catch(error => {
    //     if (typeof document !== "undefined")
    //       document.write(
    //         `Error while signing up user: ${JSON.stringify(error)}`
    //       );
    //     console.error("Error while signing up user", error);
    //   });
  }

  render() {
    const {
      fName,
      lName,
      email,
      password,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phoneNumber,
      isCommitteeMember
    } = this.state;

    return (
      <div className="signup-page">
        <Container fluid className="su-cont">
          <Form className="su-form">
            <h1>Create an HOA Management System Account</h1>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="fName"
                  value={fName}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPLname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lName"
                  value={lName}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 Main St"
                name="address1"
                value={address1}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apartment, studio, or floor"
                name="address2"
                value={address2}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={state}
                  onChange={this.handleInputChange}
                >
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Zip code"
                  name="zip"
                  value={zip}
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={country}
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleInputChange}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Button variant="secondary">Cancel</Button>
              <Button onClick={this.createUser}>Create</Button>
            </Form.Row>
          </Form>
          {/* <Button variant="secondary">Cancel</Button>
          <Button onClick={this.createUser}>Create</Button> */}
        </Container>
        <Footer />
      </div>
    );
  }
}
