import { BoardX, BoardY, createGrid, updateGrid } from '@intercept-game/game';
import { render } from '@testing-library/react';
import { GameBoardGrid, GameBoardGridProps } from './game-board-grid';

const noop = () => undefined;

const defaultHandlers: GameBoardGridProps['handlers'] = {
  onHover: noop,
  onSelect: noop,
  onEnemySelect: noop,
  onMove: noop,
  onInterceptSelect: noop,
  onIntercept: noop,
};

const emptyGrid = createGrid(() => 'empty' as const);

describe('GameBoardGrid', () => {
  it('renders successfully with an empty board', () => {
    const { baseElement } = render(
      <GameBoardGrid
        boardGrid={emptyGrid}
        planes={{ north: [], south: [] }}
        currentFaction="north"
        handlers={defaultHandlers}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders all cells in the grid', () => {
    const { container } = render(
      <GameBoardGrid
        boardGrid={emptyGrid}
        planes={{ north: [], south: [] }}
        currentFaction="north"
        handlers={defaultHandlers}
      />
    );
    // emptyGrid is MAX_BOARD_Y rows × MAX_BOARD_X cols
    const cells = container.querySelectorAll('[data-pos]');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('uses plane direction and boardHeight from the planes prop', () => {
    const boardGrid = updateGrid({
      board: emptyGrid,
      location: { x: BoardX(2), y: BoardY(3) },
      cell: 'plane',
    });

    const northPlane = {
      id: 'plane-1' as never,
      x: BoardX(2),
      y: BoardY(3),
      height: 'in-flight' as const,
      direction: 'east' as const,
      player: 'player-1' as never,
      squadron: 'foo' as never,
      downed: [],
      isDowned: false,
    };

    const { container } = render(
      <GameBoardGrid
        boardGrid={boardGrid}
        planes={{ north: [northPlane], south: [] }}
        currentFaction="north"
        handlers={defaultHandlers}
      />
    );

    // The plane icon span should have a 90deg rotation (east)
    const rotatedSpan = container.querySelector('span[style*="rotate(90deg)"]');
    expect(rotatedSpan).toBeTruthy();
  });

  it('calls onSelect when a friendly plane cell is clicked', () => {
    const onSelect = jest.fn();
    const boardGrid = updateGrid({
      board: emptyGrid,
      location: { x: BoardX(1), y: BoardY(1) },
      cell: 'plane',
    });

    const northPlane = {
      id: 'plane-north' as never,
      x: BoardX(1),
      y: BoardY(1),
      height: 'in-flight' as const,
      direction: 'north' as const,
      player: 'player-1' as never,
      squadron: 'foo' as never,
      downed: [],
      isDowned: false,
    };

    const { container } = render(
      <GameBoardGrid
        boardGrid={boardGrid}
        planes={{ north: [northPlane], south: [] }}
        currentFaction="north"
        handlers={{ ...defaultHandlers, onSelect }}
      />
    );

    const planeCell = container.querySelector('[data-pos="1-1"]');
    planeCell?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onSelect).toHaveBeenCalledWith({ plane: northPlane });
  });

  it('calls onEnemySelect when an enemy plane cell is clicked', () => {
    const onEnemySelect = jest.fn();
    const boardGrid = updateGrid({
      board: emptyGrid,
      location: { x: BoardX(5), y: BoardY(5) },
      cell: 'plane',
    });

    const southPlane = {
      id: 'plane-south' as never,
      x: BoardX(5),
      y: BoardY(5),
      height: 'in-flight' as const,
      direction: 'south' as const,
      player: 'player-2' as never,
      squadron: 'bar' as never,
      downed: [],
      isDowned: false,
    };

    const { container } = render(
      <GameBoardGrid
        boardGrid={boardGrid}
        planes={{ north: [], south: [southPlane] }}
        currentFaction="north"
        handlers={{ ...defaultHandlers, onEnemySelect }}
      />
    );

    const enemyCell = container.querySelector('[data-pos="5-5"]');
    enemyCell?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onEnemySelect).toHaveBeenCalledWith({ enemyPlane: southPlane });
  });
});
