function GameOver({ gameIsOver, playerTokens, playerTurn }) {
  const renderWinner = () => {
    if (!gameIsOver) return null;
    if (playerTurn === playerTokens.X)
      return <p className="--text-center">Player X Wins!</p>;
    if (playerTurn === playerTokens.O)
      return <p className="--text-center">Player O Wins!</p>;
    return <p className="--text-center">No Winner</p>;
  };
  return renderWinner();
}

export default GameOver;
