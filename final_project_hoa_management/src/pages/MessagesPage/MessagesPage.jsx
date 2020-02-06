import React, { Component } from "react";
import "./MessagesPage.css";
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
      selectedOption: { value: "", label: "Clear Priority Filter" },
      selectedSortOption: "date"
    };
  }

  async componentDidMount() {
    const { activeUser } = this.props;
    console.log(activeUser);

    if (activeUser) {
      const Message = Parse.Object.extend("Message");
      const query = new Parse.Query(Message);
      query.equalTo("community", activeUser.community);
      const parseMessages = await query.find();
      const messages = parseMessages.map(
        parseMessage => new MessageModel(parseMessage)
      );
      this.setState({ messages });
    }
  }

  //Function that handles the input field changes
  onChangeHandler = ev => {
    this.setState({
      input: ev.target.value
    });
    // console.log("this.state.input: " + this.state.input);
  };

  //Function that handles the select field changes
  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`this.state.selectedOption: `, selectedOption);
  };

  //Function that handles the radio field changes
  handleSortChange = ev => {
    this.setState({
      selectedSortOption: ev.target.value
    });
    // console.log(
    // "this.state.handleSortChange: " + this.state.selectedSortOption
    // );
  };

  //Function that handles the modals components to close
  handleClose = () => {
    this.setState({
      showNewMessageModal: false,
      showEditMessageModal: false
    });
  };

  //Function that adds a new message to the parse database
  //and to the messages state
  handleNewMessage = newMessage => {
    const { activeUser } = this.props;

    const Message = Parse.Object.extend("Message");
    const newParseMessage = new Message();
    newParseMessage.set("title", newMessage.title);
    newParseMessage.set("details", newMessage.details);
    newParseMessage.set("priority", newMessage.selectedOption.value);
    newParseMessage.set("selectedOption", newMessage.selectedOption);
    newParseMessage.set(
      "image",
      new Parse.File(newMessage.fileImg.file.name, newMessage.fileImg.file)
    );

    newParseMessage.set("createdBy", Parse.User.current());
    newParseMessage.set("community", activeUser.community);
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
  };

  //Function that deletes a new message from the parse database
  // and from the messages state
  deleteMessage = messageId => {
    const Message = Parse.Object.extend("Message");
    const query = new Parse.Query(Message);
    query.get(messageId).then(object => {
      object.destroy().then(
        messageDeleted => {
          console.log("Message deleted", messageDeleted);
        },
        error => {
          console.error("Error while deleting Message: ", error);
        }
      );
    });
    const { messages } = this.state;
    let messagesDel = messages;
    let messageDelId = messages.findIndex(
      messageToDelete => messageToDelete.id === messageId
    );

    messagesDel.splice(messageDelId, 1);
    console.log(messagesDel);
    this.setState({
      messages: messagesDel
    });
  };

  render() {
    const { showNewMessageModal, input, messages, selectedOption } = this.state;
    const { activeUser } = this.props;

    const options = [
      { value: "", label: "Clear Priority Filter" },
      { value: "Information", label: "Information" },
      { value: "Important", label: "Important" }
    ];

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

    // Funxtion that filters the messages array according
    // to the text entered in the input field
    let inputFilteredMessages = messages.filter(msg => {
      let boolResultofTitle = msg.title
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      let boolResultofDetails = msg.details
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      return boolResultofTitle || boolResultofDetails;
    });

    // Funxtion that filters the messages array according to the
    // selectedOption (priority)
    let priorityFilteredMessages = inputFilteredMessages.filter(msg => {
      let boolResultofPriority = msg.priority.includes(
        this.state.selectedOption.value
      );
      return boolResultofPriority;
    });

    //Sorting the messages by date or by priority
    let sortedMessages = priorityFilteredMessages;
    if (this.state.selectedSortOption === "date") {
      sortedMessages = priorityFilteredMessages.sort(function(a, b) {
        return a.createdAt < b.createdAt;
      });
    } else if (this.state.selectedSortOption === "priority") {
      sortedMessages = priorityFilteredMessages.sort(function(a, b) {
        if (a.selectedOption.value < b.selectedOption.value) {
          return -1;
        } else if (a.selectedOption.value > b.selectedOption.value) {
          return 1;
        } else return 0;
      });
    }

    const messagesView = sortedMessages.map((message, index) => (
      <MessageComponent
        ind={index}
        key={message.id}
        message={message}
        activeUser={activeUser}
        editMessage={this.editMessage}
        deleteMessage={this.deleteMessage}
      />
    ));

    const community = this.props.activeUser.community;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="messages-page">
        <Container fluid className="mp-cont">
          <Form.Group>
            <Row className="message-input-row" style={styles.row}>
              <Col lg="7" style={styles.col}>
                <FormControl
                  placeholder="Filter messages by text in Title and Details"
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
                  // defaultValue={{ label: "Clear Filter", value: "" }}
                />
              </Col>
              <Col lg="2" className="message-sort" style={styles.col}>
                <Form className="message-radio-buttons">
                  <div>Sort by:&nbsp;&nbsp;</div>
                  {["radio"].map(type => (
                    <div key={`inline-${type}`} className="radio-btns">
                      <Form.Check
                        inline
                        label="Date"
                        type={type}
                        id={`inline-${type}-1`}
                        name="sort"
                        onChange={this.handleSortChange}
                        value="date"
                        checked={this.state.selectedSortOption === "date"}
                      />
                      <Form.Check
                        inline
                        label="Priority"
                        type={type}
                        id={`inline-${type}-2`}
                        name="sort"
                        onChange={this.handleSortChange}
                        value="priority"
                        checked={this.state.selectedSortOption === "priority"}
                      />
                    </div>
                  ))}
                </Form>
              </Col>
            </Row>
          </Form.Group>
          <Row className="btn-input-row" style={styles.row}>
            <div className="message-title-table">
              Community: {community.get("community")}
            </div>
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
            <Accordion defaultActiveKey="1" className="messages-accord">
              {messagesView}
            </Accordion>
          </Row>

          <NewMessageModal
            show={showNewMessageModal}
            handleClose={this.handleClose}
            handleNewMessage={this.handleNewMessage}
          />
        </Container>
      </div>
    );
  }
}
