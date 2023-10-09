import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";
function App() {
  const [tenzies, setTenzies] = useState(false);
  const [roll, setRoll] = useState(0);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || null
  );
  const generateNewDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const addNewDices = () => {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(generateNewDice());
    }
    return diceArr;
  };

  const [dice, setDice] = useState(addNewDices());

  const rollDice = () => {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
      setRoll((prevRoll) => prevRoll + 1);
    } else {
      setTenzies(false);
      setDice(addNewDices());
      setRoll(0);
      setTime(0);
    }
  };

  const holdDice = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      isHeld={die.isHeld}
      die={die.value}
      holdDice={() => holdDice(die.id)}
    />
  ));
  const bestTimeWin = () => {
    if (!bestTime || time < bestTime) {
      localStorage.setItem("bestTime", time);
      setBestTime(time);
    }
  };
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const sameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && sameValue) {
      setTenzies(true);
      bestTimeWin();
    }
  }, [dice]);

  useEffect(() => {
    let inetervalId;
    if (!tenzies) {
      inetervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(inetervalId);
    };
  }, [tenzies]);

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {tenzies && (
        <div className='win-cond'>
          <p>Win time: {time}s </p>
          <p>Best time: {bestTime}s</p>
          <p>You won after {roll} rolls !!!</p>
        </div>
      )}
      <div className='dice-container'>{diceElements}</div>
      <button className='roll-dice' onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
