import "./App.css";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { createPortal } from "react-dom";
import ModalContent from "./components/ModalContent";

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
  const arr: JSX.Element[] = new Array(9);
  const [initialArr, setArr] = useState(arr);
  //Filling the array with Fragments
  arr.fill(<> </>);
  //function for handling user inputs
  const handleEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentButton = e.currentTarget;
    const attribute = "data-key";
    const currentIndex = currentButton.getAttribute(attribute);

    if (currentIndex !== null && currentButton.textContent === " ") {
      let index = currentIndex.charAt(0).charCodeAt(0) - 48;
      setArr((prevArr) => {
        let player;
        turn % 2 === 0
          ? (player = <BsFillRecordCircleFill />)
          : (player = <ImCross />);
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

    let sumX = Human.charAt(0).charCodeAt(0) * 3;
    let sumY = AI.charAt(0).charCodeAt(0) * 3;
    sum1 = sum(0, 4, 8, initialArr);
    sum2 = sum(0, 1, 2, initialArr);
    sum3 = sum(0, 3, 6, initialArr);
    sum4 = sum(1, 4, 7, initialArr);
    sum5 = sum(2, 5, 8, initialArr);
    sum6 = sum(2, 4, 6, initialArr);
    sum7 = sum(3, 4, 5, initialArr);
    sum8 = sum(6, 7, 8, initialArr);

    if (
      sumX === sum1 ||
      sumX === sum2 ||
      sumX === sum3 ||
      sumX === sum4 ||
      sumX === sum5 ||
      sumX === sum6 ||
      sumX === sum7 ||
      sumX === sum8
    ) {
      setWinner(Human);
      setShowModal(true);
      setWins(prev => prev + 1);
    } else if (
      sumY === sum1 ||
      sumY === sum2 ||
      sumY === sum3 ||
      sumY === sum4 ||
      sumY === sum5 ||
      sumY === sum6 ||
      sumY === sum7 ||
      sumY === sum8
    ) {
      setWinner(AI);
      setShowModal(true);
      setLoses(prev => prev + 1);
    } else if (turn === 10 && winner === "") {
      setWinner(Draw);
      setShowModal(true);
      setTies(prev => prev + 1);
    }
  }, [initialArr, turn]);

  const sum = (i: number, j: number, k: number, arr: JSX.Element[]) => {
    let result: number | string = 0;
    let element: (string | number)[] = [];
    let item1: string = arr[i].type.name ?? "";
    let item2: string = arr[j].type.name ?? "";
    let item3: string = arr[k].type.name ?? "";
    element.push(item1, item2, item3);

    element = element.map((item) => {
      if (item === "ImCross") {
        item = "X".charCodeAt(0);
      }
      if (item === "BsFillRecordCircleFill") {
        item = "O".charCodeAt(0);
      }
      return item;
    });
    result = element.reduce((accumulator, item) => {
      if (typeof item === "number" && typeof accumulator === "number") {
        accumulator += item;
      }
      return accumulator;
    });
    if (typeof result === "string") return -1;
    return result;
  };

  const handleReset = () => {
    setArr(() => {
      let arr: JSX.Element[] = new Array(9);
      arr.fill(<> </>);
      return [...arr];
    });
    setTurn(1);
    setWinner("");
  };
  let activeStyles = {};
  if (showModal) {
    activeStyles = {
      opacity: "0.3",
      backdropFilter: "blur(25px)",
      pointerEvents: "none",
    };
  }
  return (
    <main className="App grid place-content-center min-h-screen" style={activeStyles}>
      {/* header element */}
      <header className="grid grid-cols-3 grid-rows-1 place-items-center my-3">
        <div className="pl-2 flex gap-1 my-4 xl:my-3 mr-10">
          <span className="text-base xl:text-md text-teal-400">
            <ImCross />
          </span>
          <span className="text-base xl:text-md text-amber-500">
            <BsFillRecordCircleFill />
          </span>
        </div>
        <div className="turn container flex gap-2 shadow-sm justify-center align-middle text-sm py-2 rounded-md font-medium mr-4 ml-3 xl:mr-0 xl:ml-0">
          {turn % 2 ? "X" : "O"}
          <span className="uppercase text-xsm font-bold tracking-widest leading-[1.7rem]">
            turn
          </span>
        </div>
        <button
          className="reset w-50 rounded-md p-2 translate-x-7 xl:translate-x-9"
          onClick={handleReset}
        >
          <GrPowerReset />
        </button>
      </header>
      {/* ticTacToe */}
      <section className="container grid gap-3 xl:gap-4 grid-cols-3 grid-rows-3 w-80 xl:w-[400px] xl:h-[400px]">
        {initialArr.map((item, index) => {
          let styles = {};
          if (item.type.name === "ImCross") {
            styles = {
              color: "#17BEBB",
            };
          } else {
            styles = {
              color: "#FEC601",
            };
          }
          return (
            <button
              key={index}
              style={styles}
              data-key={index}
              className="h-24 shadow-md text-xxl focus:outline-none rounded-md xl:h-auto input grid place-items-center"
              onClick={handleEntry}
            >
              {item}
            </button>
          );
        })}
      </section>
      {/* Scoreboard */}
      <footer className="grid gap-3 grid-cols-3 grid-rows-1 my-6">
        <div className="grid gap-3 grid-rows-2 text-center font-bold py-2 bg-teal-500 rounded-md score leading-3 text-base pb-3">
          <h1 className="text-xxsm pt-[0.2rem]">X(You)</h1>
          {wins}
        </div>
        <div className="grid gap-3 grid-rows-2 text-center font-bold py-2 rounded-md reset score leading-3 text-base pb-3">
          <h1 className="text-xxsm pt-[0.2rem]">Ties</h1>
          {ties}
        </div>
        <div className="grid gap-3 grid-rows-2 text-center font-bold py-2 rounded-md bg-amber-500 score leading-3 text-base pb-3">
          <h1 className="text-xxsm pt-[0.2rem]">O(CPU)</h1>
          {loses}
        </div>
      </footer>
      {showModal &&
        createPortal(
          <ModalContent
            winner={winner}
            //this will be passed to next round button event handler-> moves to next round
            onNextRound={() => {
              handleReset();
              setShowModal(prev => !prev);
            }}
            //this will be passed to quit button event handler-> everything resets
            onClose={() => {
              handleReset();
              setShowModal(prev => !prev);
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
