import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import OptionButtons from "../../OptionButtons/OptionButtons";

export default class VoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // title: this.props.voting.title,
      deails: "",
      options: "",
      date: new Date()
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

  onChangeDate = date => this.setState({ date });

  createVote = () => {
    const { title, details, options, date } = this.state;
    const newVote = { title, details, options, date };
    this.props.handleNewVote(newVote);
    this.props.handleClose();
    this.setState({
      title: "",
      details: "",
      options: "",
      date: new Date()
    });
  };

  render() {
    const { show, handleClose } = this.props;
    const { title, details, options } = this.state;
    // console.log(this.props.voting);
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Vote</Modal.Title>
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
                  placeholder="Enter new vote title"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="formHorizontalDetails"
              className="vote-first-row"
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
                  placeholder="Enter new vote details"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalOptions">
              <Form.Label column lg={3}>
                Options
              </Form.Label>
              <Col lg={9}>
                <OptionButtons />

                {/* <Form.Control
                  type="text"
                  placeholder="Enter new voting options"
                  name="options"
                  value={options}
                  onChange={this.handleInputChange}
                /> */}
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
          <Button onClick={this.createVote}>Create</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
