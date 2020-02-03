import React, { Component } from "react";
import "./TenantComponent.css";

export default class TenantComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditMessageModal: false,
      input: "",
      newComment: "",
      readMessageState: false,
      updateMessageReadBy: []
    };
    // this.addComment = this.addComment.bind(this);
  }

  onChangeHandler = ev => {
    this.setState({ input: ev.target.value });
    // console.log("this.state.input: " + this.state.input);
  };

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  };

  handleClose = () => {
    this.setState({
      showEditMessageModal: false
    });
  };

  //   handleNewComment = (newComment, message) => {
  //     console.log(message);
  //     const Message = Parse.Object.extend("Message");
  //     const query = new Parse.Query(Message);
  //     // here you put the objectId that you want to update
  //     query.get(message.id).then(object => {
  //       object.set("comments", newComment);
  //       object.save().then(
  //         console.log(newComment)
  //         // theCreatedParseMessage => {
  //         //   console.log("Message created", theCreatedParseMessage);
  //         //   this.setState({
  //         //     messages: this.state.messages.concat(
  //         //       new MessageModel(theCreatedParseMessage)
  //         //     )
  //         //   });
  //         // },
  //         // error => {
  //         //   console.error("Error while creating Message: ", error);
  //         // }
  //       );
  //     });
  //   };

  //   addComment(event, message) {
  //     const { input } = this.state;
  //     const newComment = input;

  //     //   // Function that is triggered only by the Enter key
  //     if (event.keyCode === 13) {
  //       event.preventDefault();
  //       this.handleNewComment(newComment, message);
  //       //     //     // console.log(this.state.list)
  //     }
  //   }

  render() {
    const { tenant } = this.props;
    const { input } = this.state;

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
    console.log(tenant);
    // debugger;

    return (
      <tr>
        <td>{tenant.apartment}</td>
        <td>{tenant.fName}</td>
        <td>{tenant.lName}</td>
        <td>{tenant.email}</td>
        <td>{tenant.phoneNumber}</td>
      </tr>
    );
  }
}
