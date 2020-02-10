import React, { Component } from "react";
import "./EditVotingModal.css";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import Parse from "parse";

export default class EditVotingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: this.props.voting.id,
      // title: this.props.voting.title,
      // details: this.props.voting.details,
      // comments: this.props.voting.options,
      // createdBy: this.props.voting.dueDate,
      // createdAt: this.props.message.createdAt,
      // selectedOption: this.props.message.selectedOption
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

  editVoting = voting => {
    const { title, details, selectedOption, fileImg } = this.state;
    // console.log(message.id);
    // console.log("title", this.state.title);
    const Voting = Parse.Object.extend("Voting");
    const query = new Parse.Query(Voting);
    // here you put the objectId that you want to update
    query.get(voting.id).then(object => {
      object.set("title", title);
      object.set("details", details);
      object.set("selectedOption", selectedOption);
      object.set("image", new Parse.File(fileImg.file.name, fileImg.file));
      object.save().then(
        response => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
          console.log("Updated Voting", response);
        },
        error => {
          console.error("Error while updating Voting", error);
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
    const { show, handleClose, voting } = this.props;
    const { title, details, selectedOption } = this.state;

    const priorityOptions = [
      { value: "Information", label: "Information" },
      { value: "Important", label: "Important" }
    ];
    // console.log("selectedOption", this.state.selectedOption);
    // console.log("details", this.state.details);
    // console.log("massage", this.props.message);
    console.log(this.props.voting);
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Voting</Modal.Title>
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
                  placeholder="Edit voting title"
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
                  placeholder="Edit voting details"
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
                {/* <Image src={fileImg.URL} fluid width="300px" /> */}
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="btns-modal">
          <div>
            <Button variant="danger">Delete Voting</Button>
          </div>
          <div>
            <Button
              onClick={() => {
                const editVoting = this.editVoting;
                editVoting(voting);
                console.log(voting);
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
