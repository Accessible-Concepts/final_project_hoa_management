import React, { Component } from "react";
import TaskModel from "./TaskModel";
import "./OptionButtons.css";

// import ConfirmDeleteModal from "./ConfirnDeleteModal";
export default class OptionButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      optionsArray: []
    };
  }

  // Function that sets the entered input text to the state
  onChangeHandler = ev => {
    const lowerC = ev.target.value.toLowerCase();
    const upperC = lowerC.charAt(0).toUpperCase() + lowerC.substring(1);
    this.setState({ input: upperC });
  };

  // Function that adds an option to the options array
  addOption = event => {
    const { input } = this.state;
    // const {cloneInput} = {...input};
    // Function that is triggered only by the Enter key
    if (event.keyCode === 13) {
      event.preventDefault();
      const optionObj = new TaskModel(input);
      this.setState({
        optionsArray: this.state.optionsArray.concat(optionObj),
        input: ""
      });
      // console.log(this.state.list)
    }
  };

  deleteItem(index) {
    const { optionsArray } = this.state;
    const cloneList = [...optionsArray];

    cloneList.splice(index, 1);
    this.setState({
      optionsArray: cloneList
    });
  }

  deleteAllOptions() {
    this.setState({
      optionsArray: []
    });
  }
  render() {
    const { input, optionsArray } = this.state;

    const listItems = optionsArray.map((item, index) => (
      <div className="option-created" key={index}>
        <div className="option-name">{item.value}</div>
        <button
          className="option-del-btn"
          onClick={() => {
            this.deleteItem(index);
          }}
        >
          x
        </button>
      </div>
    ));
    console.log(optionsArray);
    console.log(listItems);

    return (
      <div>
        <div className="options-container">
          <div className="options-created">{listItems}</div>
          <button
            className="all-options-del-btn"
            onClick={() => {
              this.deleteAllOptions();
            }}
          >
            x
          </button>
        </div>
        <input
          className="create-option-input"
          type="text"
          id="myInput"
          value={input}
          placeholder="Enter a voting option..."
          onChange={this.onChangeHandler}
          onKeyUp={this.addOption}
        />
        {/* <ul className="myUL">{listItems}</ul> */}
        {/* <ConfirmDeleteModal
          show={this.state.show}
          handleClose={this.hideModal}
          deleteItem={this.deleteItemNoConfirm}
        ></ConfirmDeleteModal> */}
      </div>
    );
  }
}
