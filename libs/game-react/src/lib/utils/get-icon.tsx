import { BoardCellType, BoardHeight, Direction } from '@intercept-game/game';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faJetFighter,
  faCloud,
  faSquare,
  faBurst,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Returns the icon for the given cell-type.
 *
 * Internally will calculate which type of icon can be returned for the
 * given params.
 */
export function getIcon(params: GetIconParams) {
  const { boardCellType } = params;

  switch (boardCellType) {
    case 'empty':
      return <FontAwesomeIcon icon={faCloud} />;
    case 'can-move':
      return <FontAwesomeIcon icon={faSquare} />;
    case 'plane': {
      const rotationDeg = { north: 0, east: 90, south: 180, west: 270 }[
        (params as GetIconForPlane).direction
      ];
      return (
        <span style={{ display: 'inline-block', transform: `rotate(${rotationDeg}deg)` }}>
          <FontAwesomeIcon icon={faJetFighter} />
        </span>
      );
    }
    case 'aa':
      return <FontAwesomeIcon icon={faBurst} />;
    case 'bones':
      return <FontAwesomeIcon icon={faSkullCrossbones} />;
    default:
      // This should result in an error at a higher level.
      // also this should be tested against.
      return null;
  }
}

/**
 * General type params for the `getIcon` function.
 */
export type GetIconParams =
  | GetIconForEmpty
  | GetIconForCanMove
  | GetIconForPlane
  | GetIconForAA
  | GetIconForBones;

/**
 * Base type all other `GetIconParams` objects
 * inherit from.
 */
export interface GetIconBase {
  /**
   * The type of the cell. Used to determine the other types
   */
  boardCellType: BoardCellType;
}

/**
 * Params for the situation where we want to get the icon
 * for an empty board-cell-type.
 *
 * This empty type is used to display empty squares.
 */
export interface GetIconForEmpty extends GetIconBase {
  boardCellType: 'empty';
}

/**
 * Params for the situation where the user is in "move" mode and can
 * move to this cell.
 */
export interface GetIconForCanMove extends GetIconBase {
  boardCellType: 'can-move';
}

/**
 * Params for the situation where we want to get the icon
 * for a plane board-cell-type. The plane is the only icon that
 * requires special rotational logic.
 */
export interface GetIconForPlane extends GetIconBase {
  boardCellType: 'plane';
  /**
   * The direction the plane is facing
   */
  direction: Direction;
  /**
   * The "height" the plane is at. Either on the ground for
   * non-flying planes, or in the air for planes that are in flight.
   */
  boardHeight: BoardHeight;
}

/**
 * Params for the situation where we want to get the icon
 * for an AA board-cell-type.
 *
 * AA icons are static and are used to protect the base based on random chance.
 * This is slightly different than the original game which allowed the player
 * to configure the placement of their AA.
 *
 * In this version the AA is **always** available and continually provides a 50%
 * chance of downing the enemy plane. This makes base attacks more dangerous, and
 * risky.
 */
export interface GetIconForAA extends GetIconBase {
  boardCellType: 'aa';
}

/**
 * Params for the situation where we want to get the icon
 * for a "bones" board-cell-type.
 *
 * This wasn't available in the previous version of the game.
 *
 * This represents where a plane got eliminated from the board.
 */
export interface GetIconForBones extends GetIconBase {
  boardCellType: 'bones';
}
