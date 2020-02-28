import React, { useState, useEffect } from "react";

const ClockComponent = props => {
  const { activeUser } = props;

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [hours, setHours] = useState(new Date().getHours());

  useEffect(() => {
    let intervalID = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(intervalID);
  }, [time]);

  const tick = () => {
    setTime(new Date().toLocaleTimeString());
    setHours(new Date().getHours());
  };

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
};

export default ClockComponent;
