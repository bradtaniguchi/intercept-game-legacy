import { BoardX, BoardY, getBoardLocationString } from '@intercept-game/game';
import { memo } from 'react';
import {
  GameBoardCell,
  GameBoardCellData,
} from '../game-board-cell/game-board-cell';

export interface GameBoardRowProps {
  /**
   * The y-index (row index) for this row on the board.
   */
  y: BoardY;

  /**
   * The ordered list of cell data for each cell in this row.
   * Each entry's x-index corresponds to its position in the array.
   */
  cells: Array<GameBoardCellData>;
}

/**
 * A pass-along row component for the game board.
 *
 * Renders a horizontal row of `GameBoardCell` components.
 * All state management is handled by the parent `GameBoardGrid`.
 */
export const GameBoardRow = memo(function GameBoardRow({
  y,
  cells,
}: GameBoardRowProps) {
  return (
    <div>
      {cells.map((cellData, x) => (
        <GameBoardCell
          key={getBoardLocationString({ x: BoardX(x), y })}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(cellData as any)}
          x={BoardX(x)}
          y={y}
        />
      ))}
    </div>
  );
});
