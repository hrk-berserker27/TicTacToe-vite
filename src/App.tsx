import "./App.css";
import { useEffect, useState } from "react";

//components
import { createPortal } from "react-dom";
import ModalContent from "./components/ModalContent";
import Scoreboard from "./components/Scoreboard";
import TicTacToe from "./components/TicTacToe";
import Header from "./components/Header";


const Human = "X";
const AI = "O";
const Draw = "";
function App() {
  //state variables to handle turn and different game states
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState("");
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [ties, setTies] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // Creating array to handle the entry by the gamer
  const arr: string[] = new Array(9);
  arr.fill(" ");
  const [initialArr, setArr] = useState(arr);
  //function for handling user inputs
  const handleEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentButton = e.currentTarget;
    const attribute = "data-key";
    const currentIndex = currentButton.getAttribute(attribute);

    if (currentIndex !== null && currentButton.textContent === " ") {
      let index = currentIndex.charAt(0).charCodeAt(0) - 48;
      setArr((prevArr) => {
        let player = " ";
        if ((turn - 1) % 2 === 0) {
          player = "X";
        } else if ((turn - 1) % 2 !== 0) {
          player = "O";
        } else {
          return prevArr;
        }
        const lengthArr = prevArr.length;
        const leftArr = prevArr.slice(0, index);
        const rightArr = prevArr.slice(index + 1, lengthArr);
        return [...leftArr, player, ...rightArr];
      });

      setTurn((prevTurn) => {
        return prevTurn + 1; //incrementing the turn state-> else case
      });
    }
  };
  useEffect(() => {
    let sum1, sum2, sum3, sum4, sum5, sum6, sum7, sum8;
    //it uses previous state value to judge the winner
    let prevPlayer = turn % 2 ? AI : Human;
    let sum = prevPlayer.charAt(0).charCodeAt(0) * 3;

    sum1 = findSum(0, 4, 8, initialArr);
    sum2 = findSum(0, 1, 2, initialArr);
    sum3 = findSum(0, 3, 6, initialArr);
    sum4 = findSum(1, 4, 7, initialArr);
    sum5 = findSum(2, 5, 8, initialArr);
    sum6 = findSum(2, 4, 6, initialArr);
    sum7 = findSum(3, 4, 5, initialArr);
    sum8 = findSum(6, 7, 8, initialArr);

    if (
      sum === sum1 ||
      sum === sum2 ||
      sum === sum3 ||
      sum === sum4 ||
      sum === sum5 ||
      sum === sum6 ||
      sum === sum7 ||
      sum === sum8
    ) {
      setWinner(prevPlayer);
      setShowModal((prev) => !prev);
      prevPlayer === Human
        ? setWins((prev) => prev + 1)
        : setLoses((prev) => prev + 1);
    } else if (turn === 10 && winner === "") {
      setWinner(Draw);
      setShowModal((prev) => !prev);
      setTies((prev) => prev + 1);
    }
  }, [initialArr]);

  const findSum = (i: number, j: number, k: number, arr: string[]) => {
    let result: number = 0;
    if ((arr[i] !== " " && arr[j] && " ") || (arr[k] && " ")) {
      let value1 = arr[i].charAt(0).charCodeAt(0);
      let value2 = arr[j].charAt(0).charCodeAt(0);
      let value3 = arr[k].charAt(0).charCodeAt(0);
      result += value1 + value2 + value3;
    }
    return result;
  };

  const handleReset = () => {
    setArr(() => {
      let arr: string[] = new Array(9);
      arr.fill(" ");
      return [...arr];
    });
    setTurn(1);
    setWinner("");
  };
  let activeStyles = {};//this style will be applied to main element when the modal is active
  if (showModal) {
    activeStyles = {
      opacity: "0.3",
      backdropFilter: "blur(25px)",
      pointerEvents: "none",
    };
  }
  return (
    <main
      className="App grid place-content-center min-h-screen"
      style={activeStyles}
    >
      {/* header element */}
      <Header turn={turn} handleReset={handleReset} playerA={Human} playerB={AI} />
      {/* ticTacToe */}
      <TicTacToe initialArr={initialArr} handleEntry={handleEntry} />
      {/* Scoreboard */}
      <Scoreboard score={[wins, loses, ties]} />
      {/* modal */}
      {showModal &&
        createPortal(
          <ModalContent
            winner={winner}
            //this will be passed to next round button event handler-> moves to next round
            onNextRound={() => {
              handleReset();
              setShowModal((prev) => !prev);
            }}
            //this will be passed to quit button event handler-> everything resets
            onClose={() => {
              handleReset();
              setShowModal((prev) => !prev);
              setWins(0);
              setLoses(0);
              setTies(0);
            }}
          />,
          document.body
        )}
    </main>
  );
}

export default App;
/*
 * PurgeCSS:
 * styles
 * activeStyles
 * turn
 * App
 * input
 * reset
 * score
 * bg-teal-500
 * bg-amber-500
 * text-teal-400
 * text-center
 */
