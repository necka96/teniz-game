import React from "react";

const Die = ({ die, isHeld, holdDice }) => {
  function renderDots(num) {
    switch (num) {
      case 1:
        return <div className='dot center-dot'></div>;
      case 2:
        return (
          <div>
            <div className='dot top-left'></div>
            <div className='dot bottom-right'></div>
          </div>
        );
      case 3:
        return (
          <div>
            <div className='dot top-left'></div>
            <div className='dot center-dot'></div>
            <div className='dot bottom-right'></div>
          </div>
        );
      case 4:
        return (
          <div>
            <div className='dot top-left'></div>
            <div className='dot top-right'></div>
            <div className='dot bottom-left'></div>
            <div className='dot bottom-right'></div>
          </div>
        );
      case 5:
        return (
          <div>
            <div className='dot top-left'></div>
            <div className='dot top-right'></div>
            <div className='dot center-dot'></div>
            <div className='dot bottom-left'></div>
            <div className='dot bottom-right'></div>
          </div>
        );
      case 6:
        return (
          <div>
            <div className='dot top-left'></div>
            <div className='dot top-right'></div>
            <div className='dot middle-left'></div>
            <div className='dot middle-right'></div>
            <div className='dot bottom-left'></div>
            <div className='dot bottom-right'></div>
          </div>
        );
      default:
        return null;
    }
  }

  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <div className='die-face' style={styles} onClick={holdDice}>
      <div className='die'>{renderDots(die)}</div>
    </div>
  );
};

export default Die;
