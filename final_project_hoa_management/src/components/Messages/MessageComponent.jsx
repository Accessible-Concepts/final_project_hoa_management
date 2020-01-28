import React, { Component } from "react";
import "./MessageComponent.css";
import EditMessageModal from "../../components/Messages/Modals/EditMessageModal";
import CommentModel from "../../models/CommentModel";
import {
  Card,
  Accordion,
  Row,
  Col,
  ButtonToolbar,
  Button,
  Form
} from "react-bootstrap";

export default class MessageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditMessageModal: false,
      input: "",
      comment: "",
      readMessageState: false
    };
    // this.handleClose = this.handleClose.bind(this);
    // this.addComment = this.addComment.bind(this);
  }

  onChangeHandler = ev => {
    this.setState({ input: ev.target.value });
    console.log("this.state.input: " + this.state.input);
  };

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  changeReadMessageState = message => {
    this.setState({
      readMessageState: true
    });
    console.log(this.state.readMessageState);
  };

  handleClose = () => {
    this.setState({
      showEditMessageModal: false
    });
  };

  // addComment(message, event) {
  //   const { input } = this.state;
  //   // Function that is triggered only by the Enter key
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     const comment = new CommentModel(input);
  //     this.setState({
  //       comments: this.state.comments.concat(comment),
  //       input: ""
  //     });
  //     //     // console.log(this.state.list)
  //   }
  // }

  render() {
    const { message } = this.props;
    const { showEditMessageModal } = this.state;

    const styles = {
      row: {
        marginLeft: 0,
        marginRight: 0
      },
      col: {
        paddingLeft: 15,
        paddingRight: 15
      }
    };
    console.log(message.priority);
    let priorityImage = "";
    if (message.selectedOption.value === "Important") {
      priorityImage = require("./images/exclamation.png");
    } else {
      priorityImage = require("./images/info.png");
    }

    const readClass = this.state.readMessageState
      ? "message-title-read"
      : "message-title-unread";
    console.log("readclass", this.state.readMessageState);

    return (
      <Card className="message-comp">
        <Accordion.Toggle
          as={Card.Header}
          eventKey={this.props.ind}
          className={readClass}
          onClick={() => {
            const changeReadMessageState = this.changeReadMessageState;
            changeReadMessageState(message);
            // console.log(message);
          }}
        >
          <div className="message-title"> {message.title}</div>
          <div>
            <img src={priorityImage} alt="Information icon" width="25px"></img>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.ind}>
          <Card.Body>
            <Row style={styles.row}>
              <Col lg="6" style={styles.col}>
                <Row>
                  <Col lg="3">
                    <Card.Img variant="top" src={message.img} />
                  </Col>
                  <Col lg="9" style={styles.col} className="message-mid-col">
                    <Row style={styles.row} className="message-row">
                      <Col lg="3" style={styles.col}>
                        Details:
                      </Col>
                      <Col lg="9" style={styles.col}>
                        {message.details}
                      </Col>
                    </Row>
                    <Row style={styles.row}>
                      <Col lg="3" style={styles.col}>
                        Priority:
                      </Col>
                      <Col lg="9" style={styles.col}>
                        {message.priority}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col style={styles.col} lg="6">
                <Row className="message-row">
                  <div>Comments: {message.comments}</div>
                </Row>
                <Row style={styles.row}>
                  <Col lg="8">
                    <Form>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows="2"
                          className="comment-textArea"
                          // onChange={this.onChangeHandler}
                          // onKeyUp={this.addComment(message)}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col className="comment-buttons">
                    <ButtonToolbar>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          this.setState({ showEditMessageModal: true });
                        }}
                        handleClose={this.handleClose}
                      >
                        Update
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          const deleteMessage = this.props.deleteMessage;
                          deleteMessage(message.id);
                          console.log(message.id);
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonToolbar>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
        <EditMessageModal
          show={showEditMessageModal}
          handleClose={this.handleClose}
          handleEditMessage={this.handleEditMessage}
          message={this.props.message}
        />
      </Card>
    );
  }
}
