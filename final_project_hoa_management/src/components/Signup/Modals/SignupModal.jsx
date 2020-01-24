import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

export default class SignupModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.handleNewUser(newUser);
    this.props.handleClose();
    this.setState({
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
    });
  }

  render() {
    const { show, handleClose } = this.props;
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Signup to create a new Committee Member account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={this.createUser}>Create</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
