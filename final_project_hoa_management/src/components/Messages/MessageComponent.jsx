import React, { Component } from "react";
import "./MessageComponent.css";
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

    this.state = {};
  }

  render() {
    const { message } = this.props;

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
    if (message.priority === "Important") {
      priorityImage = require("./images/exclamation.png");
    } else {
      priorityImage = require("./images/info.png");
    }

    return (
      <Card className="message-comp">
        <Accordion.Toggle
          as={Card.Header}
          eventKey={this.props.ind}
          className="message-title"
        >
          <div> {message.title}</div>
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
                  <Col lg="9" style={styles.col}>
                    <Row style={styles.row} className="message-row">
                      <Col lg="3" style={styles.col}>
                        Details:
                      </Col>
                      <Col lg="9" style={styles.col} className="message-mid">
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
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col className="comment-buttons">
                    <ButtonToolbar>
                      <Button type="button" size="sm">
                        Update
                      </Button>
                      <Button type="button" variant="danger" size="sm">
                        Delete
                      </Button>
                    </ButtonToolbar>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}
