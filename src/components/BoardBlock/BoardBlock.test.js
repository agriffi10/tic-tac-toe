import { getByTitle, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BoardBlock from "./BoardBlock";

const updatePositionMock = jest.fn();

describe("Board Block", () => {
  describe("When Block is Empty it", () => {
    beforeEach(() => {
      render(
        <BoardBlock
          size={3}
          cell={0}
          position={[0, 0]}
          updatePosition={updatePositionMock}
          tokens={{ X: 1, O: 2 }}
        />
      );
    });
    it("should allow the current player to claim the block", () => {
      const button = screen.getByTitle("claim-button");
      userEvent.click(button);
      expect(updatePositionMock).toHaveBeenCalled();
      expect(updatePositionMock).toHaveBeenCalledWith([0, 0]);
      waitFor(() => {
        expect(button).not.toBeInTheDocument();
      });
    });
  });

  describe("When block is claimed it", () => {
    it("should not render the button to claim", () => {
      render(
        <BoardBlock
          size={3}
          cell={1}
          position={[0, 0]}
          updatePosition={updatePositionMock}
          tokens={{ X: 1, O: 2 }}
        />
      );
      const button = screen.queryByTitle("claim-button");
      expect(button).toBe(null);
    });
    it("should render the icon of the X claiming player", () => {
      render(
        <BoardBlock
          size={3}
          cell={1}
          position={[0, 0]}
          updatePosition={updatePositionMock}
          tokens={{ X: 1, O: 2 }}
        />
      );
      const playerX = screen.getByTestId("x-player");
      expect(playerX).toBeInTheDocument();
    });
    it("should render the icon of the O claiming player", () => {
      render(
        <BoardBlock
          size={3}
          cell={2}
          position={[0, 0]}
          updatePosition={updatePositionMock}
          tokens={{ X: 1, O: 2 }}
        />
      );
      const playerO = screen.getByTestId("o-player");
      expect(playerO).toBeInTheDocument();
    });
  });
});
