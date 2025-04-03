
import useCountdown from "@/hooks/useCountDown";
import React from "react";


const CountdownTimer = ({ targetDate }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className="timm_er">
      <span>{days} <strong>Days</strong></span>
      <span>{hours} <strong>Hours</strong></span>
      <span>{minutes} <strong>Mins</strong></span>
      <span>{seconds} <strong>Secs</strong></span>
    </div>
  );
};

export default CountdownTimer;
