import { faO, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BoardBlock.css";

const BoardBlock = ({ size, cell, position, updatePosition, tokens }) => {
  const setCellVal = () => {
    updatePosition(position);
  };

  const renderButton = () => {
    return (
      <button className="board-block__button" onClick={setCellVal}></button>
    );
  };

  const renderPlayerX = () => {
    return <FontAwesomeIcon icon={faXmark} />;
  };

  const renderPlayerO = () => {
    return <FontAwesomeIcon icon={faO} />;
  };
  return (
    <div style={{ width: `${100 / size}%` }}>
      <div className="board-block">
        <div className="board-block__inner-block">
          {cell != tokens.X && cell != tokens.O && renderButton()}
          {cell == tokens.X && renderPlayerX()}
          {cell == tokens.O && renderPlayerO()}
        </div>
      </div>
    </div>
  );
};

export default BoardBlock;
