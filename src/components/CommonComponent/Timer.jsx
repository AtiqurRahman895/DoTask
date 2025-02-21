import Countdown from "react-countdown";
import { RxLapTimer } from "react-icons/rx";
import { Tooltip } from "react-tooltip";

const Timer = ({ date, handleTimeOut, status, statusToChange, text="" }) => {
  //   const convertToISO = (dateString) => {
  //     const date = new Date(dateString);
  //     return date.toISOString().split('T')[0];
  // };

  // const closeAT = convertToISO(registration_end_date);

  const renderer = ({ days, hours, minutes, seconds }) => (
  <>
    <div className="timer flex items-center gap-1">
      <RxLapTimer className="text-custom-primary" />
      <p>
        {days} d {hours} h {minutes} m
      </p>
    </div>
    <Tooltip
      anchorSelect=".timer"
      className="!bg-custom-primary"
    >
      {text}
    </Tooltip>
  </>
  );

  const handleComplete = () => {
    if(status!=="Pending"){
      handleTimeOut(statusToChange);
    }
  };

  return (
    <div>
      <Countdown
        key="closeAt"
        date={date}
        renderer={renderer}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default Timer;
