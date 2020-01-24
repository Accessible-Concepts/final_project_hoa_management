import React, { Component } from "react";
import { Row, ListGroup } from "react-bootstrap";
import "./SearchBox.css";

export default class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleInputChange(ev) {
    const newSearchText = ev.target.value;

    this.setState({
      searchText: newSearchText
    });

    this.props.onSearchChange(newSearchText);
  }

  handleSelection(ev) {
    this.props.onSelectedResult(parseInt(ev.target.getAttribute("data-index")));
    this.setState({
      searchText: ""
    });
  }

  render() {
    const { searchPlaceholder, results } = this.props;
    const { searchText } = this.state;

    const listGroupItems = results.map((result, index) => (
      <ListGroup.Item
        key={index}
        data-index={index}
        action
        onClick={this.handleSelection}
      >
        {result}
      </ListGroup.Item>
    ));

    // let listGroupItems = [];
    // for (var i = 0; i < results.length; i++) {
    //     listGroupItems.push(<ListGroup.Item>{results[i]}</ListGroup.Item>)
    // }

    return (
      <Row>
        <input
          className="filter-input2"
          type="text"
          placeholder={searchPlaceholder}
          value={searchText}
          onChange={this.handleInputChange}
        />
        <ListGroup className="search-results">{listGroupItems}</ListGroup>
      </Row>
    );
  }
}
