import React, { Component } from "react";
import { Modal, Image, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";

export default class NewMessageModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      deails: "",
      comments: [],
      createdBy: "",
      createdAt: "",
      selectedOption: { label: "Information", value: "Information" },
      fileImg: {
        file: undefined,
        URL: undefined
      }
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

  createMessage = () => {
    const { title, details, selectedOption, fileImg } = this.state;
    const newMessage = {
      title,
      details,
      selectedOption,
      fileImg
    };
    this.props.handleNewMessage(newMessage);
    this.props.handleClose();
    this.setState({
      title: "",
      details: "",
      selectedOption: { label: "Information", value: "Information" },
      img: ""
    });
  };

  handleFileChange = event => {
    let newFileImg;
    if (event.target.files[0]) {
      newFileImg = {
        file: event.target.files[0],
        URL: URL.createObjectURL(event.target.files[0])
      };
    } else {
      newFileImg = {
        file: undefined,
        URL: undefined
      };
    }

    this.setState({ fileImg: newFileImg });
  };

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { show, handleClose } = this.props;
    const { title, details, fileImg, selectedOption } = this.state;

    const priorityOptions = [
      { value: "Information", label: "Information" },
      { value: "Important", label: "Important" }
    ];

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Message</Modal.Title>
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
                  placeholder="Enter new message title"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalDetails">
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
                  placeholder="Enter new message details"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalOptions">
              <Form.Label column lg={3}>
                Priority
              </Form.Label>
              <Col lg={9}>
                <Select
                  value={selectedOption}
                  //   defaultValue={{ label: Information, value: information }}
                  onChange={this.handleSelectChange}
                  options={priorityOptions}
                  //   placeholder="Select Message Priority"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEndDate">
              <Form.Label column lg={3}>
                Image URL
              </Form.Label>
              <Col lg={4}>
                <Form.Control type="file" onChange={this.handleFileChange} />
              </Col>
              <Col lg={4}>
                <Image src={fileImg.URL} fluid width="300px" />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={this.createMessage}>Create</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
