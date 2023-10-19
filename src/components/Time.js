import React, { useState, useEffect } from "react";

function Time({ handleTimeClick }) {
  const [time, setTime] = useState({
    hours : new Date().getHours(), 
    minutes : new Date().getMinutes(), 
    seconds : new Date().getSeconds(),
  })

  

  useEffect(() => {
    const timeId = setTimeout(() => {
      const getTime = () => {
        return { 
          hours : new Date().getHours(), 
          minutes : new Date().getMinutes(), 
          seconds : new Date().getSeconds(),
        };
      }
      const timeNow = getTime();
      const { hours, minutes, seconds } = timeNow;
      setTime({ hours, minutes, seconds });
    }, 1000)

    return () => clearTimeout(timeId);
  },[time])

  

  return (
      <>
        <div className="time-container" onClick={handleTimeClick}>{`${time.hours}:${time.minutes>=10 ? time.minutes : '0'+time.minutes}:${time.seconds>=10 ? time.seconds : '0'+time.seconds}`}</div>
      </>
  )
}

export default Time