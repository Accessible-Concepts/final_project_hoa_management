import React, { Component } from "react";
// import "./OptionButtonsComponent.css";

export default class OptionButtonComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { option, index, optionsArray } = this.props;

    console.log(option, index);
    console.log(optionsArray);

    return (
      <div className="option-created" eventKey={index}>
        <div className="option-name">{option.value}</div>
        <button
          className="option-del-btn"
          // onClick={this.props.deleteOption(index)}
          onClick={() => {
            this.props.deleteOption(index);
          }}
        >
          x
        </button>
      </div>
    );
  }
}
