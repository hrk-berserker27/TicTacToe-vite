import "./App.css";
import { useState, useEffect } from "react";

//components
import { createPortal } from "react-dom";
import ModalContent from "./components/ModalContent";
import Scoreboard from "./components/Scoreboard";
import TicTacToe from "./components/TicTacToe";
import Header from "./components/Header";
import Settings from "./components/Settings";
import { findMove, evaluateBoard } from "./helper_functions/aiLogic";

const Human = "X";
const AI = "O";
const SIZE = 9;
const Draw = "";

function App() {
  //inital array
  const arr: string[] = new Array(SIZE);
  arr.fill(" ");
  //state variables to handle turn and different game states
  const [turn, setTurn] = useState(1);
  //state for winner -> if winner is found-> X|O otherwise draw, i.e. ""
  const [winner, setWinner] = useState("");
  //state for wins
  const [wins, setWins] = useState(0);
  //state for loses
  const [loses, setLoses] = useState(0);
  //state for ties
  const [ties, setTies] = useState(0);
  //state for modal
  const [showModal, setShowModal] = useState(false);
  //state for tictactoe component
  const [initialArr, setArr] = useState(arr);
  //state for game mode
  const [gameMode, setGameMode] = useState("PvP"); //can be PvP or PvB
  //function which sets the move for AI on the board
  const setAI = (arr: string[]) => {
    if ((turn - 1) % 2 !== 0 && gameMode === "PvB") {
      let index = findMove(arr);
      if (arr[index] !== " ") {
        return;
      }
      setArr((prevArr) => [
        ...prevArr.slice(0, index),
        AI,
        ...prevArr.slice(index + 1, SIZE),
      ]);
      setTurn((prev) => prev + 1);
    }
  };
  //tracking the changes in main array and setting the optimal index by the AI
  useEffect(() => {
    setAI(initialArr);
    let prevPlayer = turn % 2 ? AI : Human; //getting the previous player,i.e. the last player who entered the move
    let playerBool = prevPlayer === AI ? false : true; //playerBool is false for AI and true for Human
    let result = evaluateBoard(initialArr, playerBool);

    if (result === 10 || result === -10) {
      setWinner(prevPlayer);
      setShowModal((prev) => !prev);
      playerBool ? setWins((prev) => prev + 1) : setLoses((prev) => prev + 1);
      return;
    } else if (result === 0 && turn === 10 && winner === "") {
      setWinner(Draw);
      setShowModal((prev) => !prev);
      setTies((prev) => prev + 1);
      return;
    }
  }, [initialArr]);
  //reset function
  const handleReset = () => {
    setTurn(1);
    setWinner("");
    setArr(new Array(SIZE).fill(" "));
  };
  //entry function
  const handleEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentButton = e.currentTarget;
    const attribute = "data-key";
    const currentIndex = currentButton.getAttribute(attribute);
    if (currentIndex !== null && currentButton.textContent === " ") {
      let index = currentIndex.charAt(0).charCodeAt(0) - 48;
      let player = " ";
      if ((turn - 1) % 2 === 0) {
        player = Human;
      } else if ((turn - 1) % 2 !== 0 && gameMode === "PvP") {
        player = AI;
      } else {
        return;
      }
      setArr((prev) => {
        return [
          ...prev.slice(0, index),
          player,
          ...prev.slice(index + 1, SIZE),
        ];
      });
      setTurn((prev) => prev + 1);
    }
  };

  let activeStyles = {}; //this style will be applied to main element when the modal is active
  if (showModal) {
    activeStyles = {
      opacity: "0.3",
      backdropFilter: "blur(25px)",
      pointerEvents: "none",
    };
  }
  return (
    <main
      className="App grid place-content-center min-h-screen relative"
      style={activeStyles}
    >
      {/* header element */}
      <Header
        turn={turn}
        handleReset={handleReset}
        playerA={Human}
        playerB={AI}
      />
      {/* ticTacToe */}
      <TicTacToe arr={initialArr} handleEntry={handleEntry} />
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
      {/* setting component which renders the modal to set game mode */}
      <Settings
        mode={gameMode}
        onSetMode={(value: string) => {
          setGameMode(value);
        }}
      />
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
