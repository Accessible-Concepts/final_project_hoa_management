import React, { Component } from "react";
import "./MessagesPage.css";
import MainNavbar from "../../components/navbar/MainNavbar";
import Footer from "../../components/footer/Footer";
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
import NewMessageModal from "../../components/Messages/Modals/NewMessageModal";
import MessageModel from "../../models/MessageModel";
import Parse from "parse";
import Select from "react-select";

export default class MessagesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewMessageModal: false,
      input: "",
      messages: [],
      selectedOption: null
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
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

  onChangeHandler = ev => {
    this.setState({ input: ev.target.value });
    console.log("this.state.input: " + this.state.input);
  };

  handleClose() {
    this.setState({
      showNewMessageModal: false
    });
  }

  handleNewMessage(newMessage) {
    const Message = Parse.Object.extend("Message");
    const newParseMessage = new Message();
    newParseMessage.set("title", newMessage.title);
    newParseMessage.set("details", newMessage.details);
    newParseMessage.set("priority", newMessage.selectedOption.value);
    newParseMessage.set(
      "image",
      new Parse.File(newMessage.fileImg.file.name, newMessage.fileImg.file)
    ); //TODO:files are not being uplodaded
    newParseMessage.set("userId", Parse.User.current());
    newParseMessage.save().then(
      theCreatedParseMessage => {
        console.log("Message created", theCreatedParseMessage);
        this.setState({
          messages: this.state.messages.concat(
            new MessageModel(theCreatedParseMessage)
          )
        });
      },
      error => {
        console.error("Error while creating Message: ", error);
      }
    );
  }

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  deleteMessage() {
    // const { title, details, selectedOption, fileImg } = this.state;
    // const newMessage = {
    //   title,
    //   details,
    //   selectedOption,
    //   img: fileImg.URL
    // };
    // this.props.handleNewMessage(newMessage);
    // this.props.handleClose();
    // this.setState({
    //   title: "",
    //   details: "",
    //   selectedOption: { label: "Information", value: "information" },
    //   img: ""
    // });
  }

  render() {
    const { showNewMessageModal, input, messages, selectedOption } = this.state;

    const { activeUser, handleLogout } = this.props;

    const options = [
      { value: "info", label: "Information" },
      { value: "important", label: "Important" },
      { value: "", label: "Clear Filter" }
    ];

    if (!activeUser) {
      return <Redirect to="/" />;
    }
    // console.log("activeUser:" + this.props.activeUser.id);

    let inputFilteredMessages = messages.filter(msg => {
      let boolResultofTitle = msg.title
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      let boolResultofDetails = msg.details
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      return boolResultofTitle || boolResultofDetails;
    });

    // let priorityFilteredMessages = inputFilteredMessages.filter(msg => {
    //   let boolResultofPriority = msg.priority.includes(
    //     this.state.selectedOption
    //   );
    //   return boolResultofPriority;
    // });

    // const messagesView = priorityFilteredMessages.map((message, index) => (
    const messagesView = inputFilteredMessages.map((message, index) => (
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
              <Col lg="6" style={styles.col}>
                <FormControl
                  // size="sm"
                  placeholder="Filter by Text in Title and Details"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={input}
                  onChange={this.onChangeHandler}
                />
              </Col>
              <Col lg="3" style={styles.col}>
                <Select
                  value={selectedOption}
                  onChange={this.handleSelectChange}
                  options={options}
                  placeholder="Filter by Priority"
                  className="msg-option-select"
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
