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
    const { hours, time } = this.state;
    const { activeUser } = this.props;
    // let timeHHMM = time.slice(0, -3);

    let greeting;
    if (hours >= 6 && hours < 12) {
      greeting = "Good morning ";
    } else if (hours >= 12 && hours < 17) {
      greeting = "Good afternoon ";
    } else if (hours >= 17 && hours < 20) {
      greeting = "Good evening ";
    } else if (hours >= 20 && hours <= 23) {
      greeting = "Good night";
    } else if (hours >= 0 && hours < 6) {
      greeting = "Good night";
    }

    const activeUserName = activeUser ? activeUser.fName : null;

    let navbarGreeting = activeUserName ? greeting : null;

    return (
      <div>
        {/* <p className="App-clock">The time is {timeHHMM}</p> */}
        {/* <div>{this.state.hours}</div> */}
        <div>
          {navbarGreeting} {activeUserName}
        </div>
      </div>
    );
  }
}
