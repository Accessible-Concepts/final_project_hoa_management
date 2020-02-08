import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default class NewMessageModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apartment: "",
      fName: "",
      lName: "",
      email: "",
      password: "",
      phoneNumber: ""
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.value.charAt(0).toUpperCase() + target.value.substring(1);
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  createTenant = () => {
    const {
      apartment,
      fName,
      lName,
      email,
      password,
      phoneNumber
    } = this.state;
    const newTenant = {
      apartment,
      fName,
      lName,
      email,
      password,
      phoneNumber
    };
    this.props.handleNewTenant(newTenant);
    this.props.handleClose();
    this.setState({
      apartment: "",
      fName: "",
      lName: "",
      email: "",
      password: "",
      phoneNumber: ""
    });
  };

  render() {
    const { show, handleClose } = this.props;
    const {
      apartment,
      fName,
      lName,
      email,
      password,
      phoneNumber
    } = this.state;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Tenant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalApartment">
              <Form.Label column lg={4}>
                Apartment #
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter tenant's apartment number"
                  name="apartment"
                  value={apartment}
                  min="1"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalfName">
              <Form.Label column sm={4}>
                First Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter tenant's first name"
                  name="fName"
                  value={fName}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontallName">
              <Form.Label column sm={4}>
                Last Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter tenant's last name"
                  name="lName"
                  value={lName}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column lg={4}>
                Email Address
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  type="email"
                  placeholder="Enter tenant's email address"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column lg={4}>
                Password
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  type="password"
                  placeholder="Enter tenant's password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPhone">
              <Form.Label column lg={4}>
                Phone Number
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter tenant's phone number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.createTenant}>Save</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
