let min = Number.MIN_SAFE_INTEGER;
let max = Number.MAX_SAFE_INTEGER;
let Human = "X";
let AI = "O";
let SIZE = 9;

function findEmptySpaceIndex(arr: string[]): number[] {
  let newArr = [];
  for (let i = 0; i < SIZE; i++) {
    if (arr[i] === " ") {
      newArr.push(i);
    }
  }
  return newArr;
}

function findMove(arr: string[]): number {
  //initialising best value and best move;
  let bestVal = max;
  let bestMove = -1;
  //collecting all the empty spots on the board
  let emptyIndexArray = findEmptySpaceIndex(arr);

  for (let index of emptyIndexArray) {
    arr[index] = AI;
    let val = minimax(arr, 0, true, min, max);
    arr[index] = " ";
    if (val < bestVal) {
      bestVal = val;
      bestMove = index;
    }
  }
  return bestMove;
}
function minimax(
  arr: string[],
  depth: number,
  isMax: boolean,
  alpha: number,
  beta: number
) {
  //If X wins
  if (evaluateBoard(arr, true) === 10) {
    return 10 - depth;
  }
  //If Y wins
  if (evaluateBoard(arr, false) === -10) {
    return -10 + depth;
  }
  //If it is a draw
  if (isBoardFull(arr)) {
    return 0;
  }
  let best: number;
  if (isMax) {
    best = min;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === " ") {
        arr[i] = Human;
        let val = minimax(arr, depth + 1, !isMax, alpha, beta);
        arr[i] = " ";
        best = Math.max(best, val);
        alpha = Math.max(best, alpha);
        if (beta <= alpha) {
          break;
        }
      }
    }
  } else {
    best = max;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === " ") {
        arr[i] = AI;
        let val = minimax(arr, depth + 1, !isMax, alpha, beta);
        arr[i] = " ";
        best = Math.min(best, val);
        beta = Math.min(best, beta);
        if (beta <= alpha) {
          break;
        }
      }
    }
  }
  return best;
}
export function evaluateBoard(arr: string[], player: boolean) {
  let sum = 0,
    value = 0;
  if (player) {
    sum = Human.charAt(0).charCodeAt(0) * 3;
    value = 10;
  } else {
    sum = AI.charAt(0).charCodeAt(0) * 3;
    value = -10;
  }
  let sum1 = findSum(0, 1, 2, arr);
  let sum2 = findSum(2, 5, 8, arr);
  let sum3 = findSum(0, 3, 6, arr);
  let sum4 = findSum(6, 7, 8, arr);
  let sum5 = findSum(6, 4, 2, arr);
  let sum6 = findSum(0, 4, 8, arr);
  let sum7 = findSum(1, 4, 7, arr);
  let sum8 = findSum(3, 4, 5, arr);

  if (
    sum1 === sum ||
    sum2 === sum ||
    sum3 === sum ||
    sum4 === sum ||
    sum5 === sum ||
    sum6 === sum ||
    sum7 === sum ||
    sum8 === sum
  ) {
    return value;
  }
  return 0;
}
const findSum = (i: number, j: number, k: number, arr: string[]) => {
  let value1 = arr[i].charAt(0).charCodeAt(0);
  let value2 = arr[j].charAt(0).charCodeAt(0);
  let value3 = arr[k].charAt(0).charCodeAt(0);
  if (arr[i] === " " || arr[j] === " " || arr[k] === " ") {
    return -1;
  }
  return value1 + value2 + value3;
};

const isBoardFull = (arr: string[]) => {
  let count = 0;
  for (let i = 0; i < SIZE; i++) {
    if (arr[i] !== " ") count++;
  }
  if (count === SIZE) {
    return true;
  }
  return false;
};
export { findMove };
