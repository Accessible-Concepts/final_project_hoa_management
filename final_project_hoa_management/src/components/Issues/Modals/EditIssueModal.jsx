import React, { Component } from "react";
import "./EditIssueModal.css";
import { Modal, Image, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import Parse from "parse";

export default class EditIssueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.issue.id,
      title: this.props.issue.title,
      details: this.props.issue.details,
      comments: this.props.issue.comments,
      createdBy: this.props.issue.createdBy,
      createdAt: this.props.issue.createdAt,
      selectedOption: this.props.issue.selectedOption,
      fileImg: {
        file: undefined,
        URL: undefined
      },
      issueActive: this.props.issue.issueActive
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

  editIssue = issue => {
    const { title, details, selectedOption, fileImg, issueActive } = this.state;
    // console.log(issue.id);
    // console.log("title", this.state.title);
    const Issue = Parse.Object.extend("Issue");
    const query = new Parse.Query(Issue);
    // here you put the objectId that you want to update
    query.get(issue.id).then(object => {
      object.set("title", title);
      object.set("details", details);
      object.set("selectedOption", selectedOption);
      object.set("image", new Parse.File(fileImg.file.name, fileImg.file));
      object.set("issueActive", issueActive);
      object.save().then(
        response => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          console.log("Updated Issue", response);
        },
        error => {
          console.error("Error while updating issue", error);
        }
      );
    });
    this.props.handleClose();
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
    const { show, handleClose, issue } = this.props;
    const { title, details, fileImg, selectedOption } = this.state;

    const priorityOptions = [
      { value: "Normal", label: "Normal" },
      { value: "Important", label: "Important" },
      { value: "Urgent", label: "Urgent" }
    ];
    // console.log("selectedOption", this.state.selectedOption);
    // console.log("details", this.state.details);
    // console.log("massage", this.props.issue);

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Issue</Modal.Title>
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
                  placeholder="Edit issue title"
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
                  type="text"
                  placeholder="Edit issue details"
                  name="details"
                  value={details}
                  onChange={this.handleInputChange}
                  required
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
                  onChange={this.handleSelectChange}
                  options={priorityOptions}
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
        <Modal.Footer className="btns-modal">
          <div>
            <Button variant="danger">Delete Issue</Button>
          </div>
          <div>
            <Button
              onClick={() => {
                const editIssue = this.editIssue;
                editIssue(issue);
                console.log(issue);
              }}
            >
              Save
            </Button>
            <Button
              className="cancel-btn"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
