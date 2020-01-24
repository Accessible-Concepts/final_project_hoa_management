import React, { Component } from "react";
import "./MessagesPage.css";
import MainNavbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";
import {
  Accordion,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import MessageComponent from "../../components/Messages/MessageComponent";
import NewMessageModal from "../../models/NewMessageModal";
import MessageModel from "../../models/MessageModel";
import Parse from "parse";
import Select from "react-select";

const options = [
  { value: "info", label: "Info" },
  { value: "important", label: "Important" },
  { value: "no-filter", label: "No Filter" }
];

export default class MessagesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewMessageModal: false,
      messages: [],
      selectedOption: null
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  componentDidMount() {
    if (this.props.activeUser) {
      const Message = Parse.Object.extend("Message");
      const query = new Parse.Query(Message);
      query.find().then(
        parseMessages => {
          const messages = parseMessages.map(
            parseMessage => new MessageModel(parseMessage)
          );
          this.setState({ messages });
        },
        error => {
          console.error("Error while fetching message", error);
        }
      );
    }
    console.log(this.state.messages);
  }

  handleClose() {
    this.setState({
      showNewMessageModal: false
    });
  }

  handleNewMessage(newMessage) {
    this.props.handleNewMessage(newMessage);
  }

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { showNewMessageModal, messages, selectedOption } = this.state;

    const { activeUser, handleLogout } = this.props;

    if (!activeUser) {
      return <Redirect to="/" />;
    }
    console.log("activeUser:" + this.props.activeUser.id);

    const messagesView = messages.map((message, index) => (
      <MessageComponent ind={index} key={message.id} message={message} />
    ));

    const styles = {
      row: {
        marginLeft: 0,
        marginRight: 0
      },
      col: {
        paddingLeft: 0,
        paddingRight: 0
      }
    };

    return (
      <div className="messages-page">
        <MainNavbar activeUser={activeUser} handleLogout={handleLogout} />
        <Container fluid className="mp-cont">
          <Form.Group>
            <Row className="message-input-row" style={styles.row}>
              <Col lg="7" style={styles.col}>
                <FormControl
                  // size="sm"
                  placeholder="Filter by Text in Title and Details"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </Col>
              <Col lg="2" style={styles.col}>
                <Select
                  value={selectedOption}
                  onChange={this.handleSelectChange}
                  options={options}
                  placeholder="Filter by Priority"
                />
              </Col>
              <Col lg="3" className="message-sort" style={styles.col}>
                Sort by:&nbsp;
                <Form>
                  {["radio"].map(type => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="Date"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="Priority"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>
                  ))}
                </Form>
              </Col>
            </Row>
            <Row className="btn-input-row" style={styles.row}>
              <Button
                size="sm"
                onClick={() => {
                  this.setState({ showNewMessageModal: true });
                }}
              >
                New Message
              </Button>
            </Row>
            <Row style={styles.row}>
              <Accordion defaultActiveKey="1" className="my-accord">
                {messagesView}
              </Accordion>
            </Row>

            <NewMessageModal
              show={showNewMessageModal}
              handleClose={this.handleClose}
              handleNewMessage={this.handleNewMessage}
            />
          </Form.Group>
        </Container>
        <Footer />
      </div>
    );
  }
}
