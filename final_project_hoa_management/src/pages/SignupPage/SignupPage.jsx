import React, { Component } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import "./SignupPage.css";
import Parse from "parse";
import { Redirect } from "react-router-dom";

export default class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      fName: "Liam",
      lName: "Hasson",
      email: "hassonfour@gmail.com",
      password: "123",
      community: "1Main street",
      address1: "1 Main street",
      address2: "",
      city: "Tel Aviv",
      state: "",
      zip: "23125",
      country: "Israel",
      phoneNumber: "050-2434111",
      isCommitteeMember: true,
      newUserId: "",
      newCommunityId: ""
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  createUser = () => {
    const {
      fName,
      lName,
      email,
      password,
      community,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phoneNumber,
      isCommitteeMember
    } = this.state;

    const newUserInfo = {
      fName,
      lName,
      email,
      password,
      community,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phoneNumber,
      isCommitteeMember
    };
    this.handleNewUser(newUserInfo);
    this.handleNewCommunity(newUserInfo);

    // this.props.handleClose();
    this.setState({
      fName: "",
      lName: "",
      email: "",
      password: "",
      community: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phoneNumber: ""
    });
  };

  handleNewUser = newUserInfo => {
    const newParseUser = new Parse.User();
    newParseUser.set("username", newUserInfo.email);
    newParseUser.set("fName", newUserInfo.fName);
    newParseUser.set("lName", newUserInfo.lName);
    newParseUser.set("email", newUserInfo.email);
    newParseUser.set("password", newUserInfo.password);
    newParseUser.set("phoneNumber", newUserInfo.phoneNumber);
    newParseUser.set("isCommitteeMember", this.state.isCommitteeMember);
    newParseUser.set("apartment", newUserInfo.apartment);
    // console.log("newParseUser: ", newParseUser);
    newParseUser
      .signUp()
      .then(newParseUser => {
        console.log("User signed up", newParseUser);
        this.setState({
          newUserId: newParseUser.id
        });
      })
      .catch(error => {
        console.error("Error while signing up user", error);
      });
  };

  handleNewCommunity = newUserInfo => {
    //  const User = Parse.Object.extend("User");
    const Community = Parse.Object.extend("Community");
    const newParseCommunity = new Community();

    newParseCommunity.set("community", newUserInfo.community);
    newParseCommunity.set("address1", newUserInfo.address1);
    newParseCommunity.set("address2", newUserInfo.address2);
    newParseCommunity.set("city", newUserInfo.city);
    newParseCommunity.set("state", newUserInfo.state);
    newParseCommunity.set("zip", Number(newUserInfo.zip));
    newParseCommunity.set("country", newUserInfo.country);
    // console.log("myNewObject: ", myNewObject);
    newParseCommunity
      .save()
      .then(newParseCommunity => {
        console.log("Community created", newParseCommunity);
        this.setState({
          newCommunityId: newParseCommunity.id
        });
      })
      .catch(error => {
        console.error("Error while creating community", error);
      });

    const User = new Parse.User();
    const query = new Parse.Query(User);

    // Finds the user by its ID
    query.get(this.state.newUserId).then(user => {
      // Updates the data we want

      user.set("community", new Parse.Object(this.state.newCommunityId));
      // Saves the user with the updated data
      user
        .save()
        .then(response => {
          console.log("Updated user", response);
        })
        .catch(error => {
          console.error("Error while updating user", error);
        });
    });
  };

  render() {
    const {
      fName,
      lName,
      email,
      password,
      community,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phoneNumber
    } = this.state;
    const { activeUser } = this.props;

    console.log(this.state.newUserId);
    console.log(this.state.newCommunityId);

    if (activeUser) {
      return <Redirect to="/dashboard" />;
    }

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

            <Form.Group controlId="formGridCommunity">
              <Form.Label>Community/Building Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter community or building name"
                name="community"
                value={community}
                onChange={this.handleInputChange}
              />
            </Form.Group>

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
