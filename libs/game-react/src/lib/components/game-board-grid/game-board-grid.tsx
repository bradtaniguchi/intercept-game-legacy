import {
  BoardCellType,
  BoardGrid,
  BoardX,
  BoardY,
  Faction,
  getBoardLocationString,
  isPlaneBoardCellType,
  Plane,
} from '@intercept-game/game';
import { useCallback } from 'react';
import { GameBoardHandlers } from '../../models/game-board-handlers';
import { GameBoardRow } from '../game-board-row/game-board-row';
import { GameBoardCellData } from '../game-board-cell/game-board-cell';

export interface GameBoardGridProps {
  /**
   * The board-grid data, that represents what is shown in each cell.
   */
  boardGrid: BoardGrid<BoardCellType>;

  /**
   * Planes for both factions. Used to look up direction and boardHeight
   * for cells that contain a plane.
   */
  planes: {
    north: Array<Plane>;
    south: Array<Plane>;
  };

  /**
   * The faction of the current player. Used to route click handlers
   * to the correct friendly/enemy handler.
   */
  currentFaction: Faction;

  /**
   * Global game-action handlers. These are called from individual cells
   * for specific actions. All cells in the game-board will use the same
   * handlers.
   */
  handlers: GameBoardHandlers;
}

/**
 * The game board instance. The primary top level component
 * used to manage the game state.
 *
 * This component may change in the future, but generally is used
 * to render the UI to the user, but not manage any of the state itself.
 *
 * The state should be handled by the parent component.
 */
export function GameBoardGrid(props: GameBoardGridProps) {
  const { boardGrid, planes, currentFaction, handlers } = props;

  const allPlanes = [...planes.north, ...planes.south];

  const buildCellProps = useCallback(
    (
      cellType: BoardCellType,
      x: BoardX,
      y: BoardY
    ): GameBoardCellData => {
      const location = { x, y };

      if (isPlaneBoardCellType(cellType)) {
        const plane = allPlanes.find((p) => p.x === x && p.y === y);
        const isEnemy =
          plane &&
          (currentFaction === 'north'
            ? planes.south.includes(plane)
            : planes.north.includes(plane));

        return {
          boardCellType: 'plane',
          direction: plane?.direction ?? 'north',
          boardHeight: plane?.height ?? 'ground',
          onHover: () => handlers.onHover({ cell: location }),
          onClick: plane
            ? isEnemy
              ? () => handlers.onEnemySelect({ enemyPlane: plane })
              : () => handlers.onSelect({ plane })
            : undefined,
        };
      }

      return {
        boardCellType: cellType,
        onHover: () => handlers.onHover({ cell: location }),
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boardGrid, planes, currentFaction, handlers]
  );

  return (
    <div>
      {boardGrid.map((row, y) => (
        <GameBoardRow
          key={getBoardLocationString({ x: BoardX(0), y: BoardY(y) })}
          y={BoardY(y)}
          cells={row.map((cellType, x) =>
            buildCellProps(cellType, BoardX(x), BoardY(y))
          )}
        />
      ))}
    </div>
  );
}
