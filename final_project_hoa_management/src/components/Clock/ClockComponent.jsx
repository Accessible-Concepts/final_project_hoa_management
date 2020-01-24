import React, { Component } from "react";

export default class ClockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
      hours: new Date().getHours()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString(),
      hours: new Date().getHours()
    });
  }

  render() {
    const h = this.state.hours;
    let greeting;
    console.log(h);
    if (h >= 6 && h < 12) {
      greeting = "Good morning ";
    } else if (h >= 12 && h < 17) {
      greeting = "Good afternoon ";
    } else if (h >= 17 && h < 20) {
      greeting = "Good evening ";
    } else if (h >= 20 && h < 6) {
      greeting = "Good night";
    }
    return (
      <div className="clock-comp">
        <p className="App-clock">The time is {this.state.time}</p>
        <div>{this.state.hours}</div>
        <div> {greeting}</div>
      </div>
    );
  }
}
