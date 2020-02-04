import React, { Component } from "react";
import Switch from "react-switch";

export default class SwitchButton extends Component {
  constructor() {
    super();
    this.state = {
      // issueActive: this.props.issue.issueActive,
      checked: false
      // checked: this.props.issue.issueActive
    };
  }

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    // const { checked } = this.props;

    return (
      <label>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#86d3ff"
          onHandleColor="#007BFF"
          handleDiameter={25}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={80}
          className="react-switch"
          id="material-switch"
          // checked={checked}  //TODO:keep
          // onChange={this.handleChange} //TODO:keep
        />
      </label>
    );
  }
}
