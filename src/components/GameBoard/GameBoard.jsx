import { useEffect, useState } from "react";
import BoardBlock from "../BoardBlock/BoardBlock";
import GameOver from "../GameOver/GameOver";
import "./GameBoard.css";

function GameBoard() {
  const [board, setBoard] = useState([]);
  /**
   * Board will be an array of arrays where the values are treated as the state
   * [[0, 0, 0],
   * [0, 0, 0],
   * [0, 0, 0]]
   */
  const [boardSize, setBoardSize] = useState(3);
  const [availableSpaces, setAvailableSpaces] = useState(9);
  const [playerTurn, setPlayerTurn] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);

  // Dictionary of players, we use the values of x and o to populate the board
  const playerTokens = {
    X: 1,
    O: 2,
    DRAW: 3,
  };

  const configureBoard = () => {
    // Make an array of 0's the length of the board
    let rowArray = new Array(boardSize).fill(0);
    let columnArray = [];
    // Add a column to match the number of items per array, 4x4, 3x3, etc.
    for (let i = 0; i < boardSize; i++) {
      columnArray.push(rowArray);
    }
    setBoard(columnArray);
  };

  const checkWinCondition = () => {
    // We could probably check conditions in order of simplicity and prevent the others from running if we've already found one, but that might be overkill
    const isVerticalCondition = isColumnWin();
    const isRowCondition = isRowWin();
    const isDiagonal = isDiagonalWin();
    let isWin = isVerticalCondition || isRowCondition || isDiagonal;
    if (!isWin) togglePlayer();
    return isWin;
  };

  const isRowWin = () => {
    let isWin = false;
    board.forEach((row) => {
      isWin = !isWin ? checkVals(row) : isWin;
    });
    return isWin;
  };

  const isColumnWin = () => {
    let isWin = false;
    for (let i = 0; i < board.length; i++) {
      let valsToCheck = [];
      for (let j = 0; j < board.length; j++) {
        valsToCheck.push(board[j][i]);
      }
      isWin = checkVals(valsToCheck);
      if (isWin) return isWin;
    }
    return isWin;
  };

  const isDiagonalWin = () => {
    let diagLTR = [];
    let diagRTL = [];
    for (let i = 0; i < board.length; i++) {
      diagLTR.push(board[i][i]);
    }
    for (let i = board.length - 1; i >= 0; i--) {
      diagRTL.push(board[i][Math.abs(i - (board.length - 1))]);
    }
    return checkVals(diagLTR) || checkVals(diagRTL);
  };

  const checkVals = (arrayOfVal) => {
    // Abstracted this here because once we have our values in any win condition we should run this
    if (arrayOfVal.length === 0) return false;
    return arrayOfVal.every((val) => val === playerTurn);
  };

  const updatePosition = ({ colIndex, cellIndex }) => {
    if (gameIsOver) return;
    // Copy the board to avoid object reference nonsense
    let tempArray = JSON.parse(JSON.stringify(board));
    tempArray[colIndex][cellIndex] = playerTurn;
    setAvailableSpaces(availableSpaces - 1);
    setBoard(tempArray);
  };

  const togglePlayer = () => {
    if (playerTurn === playerTokens.X) setPlayerTurn(playerTokens.O);
    else if (playerTurn === playerTokens.O) setPlayerTurn(playerTokens.X);
  };

  useEffect(() => {
    // When board size changes, lets make some updates
    configureBoard();
    setPlayerTurn(playerTokens.X);
  }, [boardSize]);

  useEffect(() => {
    // Any time the board updates lets check to see if we have a winner
    setGameIsOver(checkWinCondition());
  }, [board]);

  useEffect(() => {
    if (availableSpaces === 0 && !gameIsOver) {
      setPlayerTurn(playerTokens.DRAW);
      setGameIsOver(true);
    }
  }, [availableSpaces]);

  return (
    <>
      <h1 className="--text-center">Tic Tac Toe</h1>

      <div className="play-area">
        <GameOver
          gameIsOver={gameIsOver}
          playerTokens={playerTokens}
          playerTurn={playerTurn}
        />
        <div className="play-area__game-board">
          {board.map((boardCol, colIndex) =>
            boardCol.map((cell, cellIndex) => (
              <BoardBlock
                cell={cell}
                position={{ colIndex, cellIndex }}
                key={cellIndex}
                size={boardSize}
                tokens={playerTokens}
                updatePosition={updatePosition}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default GameBoard;
