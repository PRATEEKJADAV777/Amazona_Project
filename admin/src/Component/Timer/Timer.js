import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [counter, setCounter] = useState(10);
  const { mute } = props;

  useEffect(() => {
    let timerId;

    if (mute && counter > 0) {
      timerId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
// eslint-disable-next-line
  }, [mute]);

  // Reset the counter when mute becomes false
  useEffect(() => {
    if (!mute) {
      setCounter(10); // Set the counter to the initial value when mute becomes false
    }
  }, [mute]);

  return (
    <p className={counter === 10 ? "d-none" : "d-block"} style={{ margin: 0 }} > Wait For Secound {counter} sec.</p>
  );
};

export default Timer;
