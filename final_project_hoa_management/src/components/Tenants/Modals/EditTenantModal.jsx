import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Parse from "parse";

export default class EditTenantModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apartment: "",
      fName: "",
      lName: "",
      email: "",
      password: "",
      phoneNumber: "",
      id: ""
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.tenantEdit !== prevProps.tenantEdit) {
      this.setState({
        apartment: this.props.tenantEdit.apartment,
        fName: this.props.tenantEdit.fName,
        lName: this.props.tenantEdit.lName,
        email: this.props.tenantEdit.email,
        password: this.props.tenantEdit.password,
        phoneNumber: this.props.tenantEdit.phoneNumber,
        id: this.props.tenantEdit.id
      });
    }
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

  editTenant = () => {
    const {
      apartment,
      fName,
      lName,
      email,
      password,
      phoneNumber,
      id
    } = this.state;
    const editTenant = {
      apartment,
      fName,
      lName,
      email,
      password,
      phoneNumber,
      id
    };
    this.handleEditTenant(editTenant);
    this.props.handleClose();
    this.setState({
      apartment: "",
      fName: "",
      lName: "",
      email: "",
      password: "",
      phoneNumber: "",
      id: ""
    });
  };

  handleEditTenant = editTenant => {
    //TODO: Check with Nir
    // const parseUser = new Parse.User();
    // const query = new Parse.Query(parseUser);
    // // Finds the user by its ID
    // query.get(editTenant.id).then(editUser => {
    //   // Updates the data we want
    //   editUser.set("username", this.state.email);
    //   editUser.set("email", this.state.email);
    //   editUser.set("email2", this.state.email);
    //   editUser.set("phoneNumber", this.state.phoneNumber);
    //   editUser.set("lName", this.state.lName);
    //   editUser.set("fName", this.state.fName);
    //   editUser.set("apartment", this.state.apartment);
    //   // Saves the user with the updated data
    //   editUser
    //     .save()
    //     .then(response => {
    //       console.log("Updated user", response);
    //     })
    //     .catch(error => {
    //       console.error("Error while updating user", error);
    //     });
    // });
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
          <Modal.Title>Edit Tenant</Modal.Title>
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
          <Button onClick={this.editTenant}>Save</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
