import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

export default class NewVotingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      deails: "",
      options: "",
      date: new Date()
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createVoting = this.createVoting.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onChangeDate = date => this.setState({ date });

  createVoting() {
    const { title, details, options, date } = this.state;
    const newVoting = { title, details, options, date };
    this.props.handleNewVoting(newVoting);
    this.props.handleClose();
    this.setState({
      title: "",
      details: "",
      options: "",
      date: new Date()
    });
  }

  render() {
    const { show, handleClose } = this.props;
    const { title, details, options } = this.state;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Voting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalTitle">
              <Form.Label column lg={3}>
                Title
              </Form.Label>
              <Col lg={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter new voting title"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="formHorizontalDetails"
              className="voting-first-row"
            >
              <Form.Label column sm={3}>
                Details
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="details"
                  value={details}
                  type="text"
                  placeholder="Enter new voting details"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalOptions">
              <Form.Label column lg={3}>
                Options
              </Form.Label>
              <Col lg={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter new voting options"
                  name="options"
                  value={options}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEndDate">
              <Form.Label column lg={3}>
                End Date:
              </Form.Label>
              <Col lg={9}>
                <DateTimePicker
                  onChange={this.onChangeDate}
                  value={this.state.date}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.createVoting}>Create</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
