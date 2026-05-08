import { BoardY } from '@intercept-game/game';
import { render } from '@testing-library/react';
import { GameBoardRow } from './game-board-row';

describe('GameBoardRow', () => {
  it('renders successfully', () => {
    const { baseElement } = render(
      <GameBoardRow
        y={BoardY(0)}
        cells={[{ boardCellType: 'empty' }, { boardCellType: 'aa' }]}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders the correct number of cells', () => {
    const cellCount = 5;
    const { container } = render(
      <GameBoardRow
        y={BoardY(2)}
        cells={Array.from({ length: cellCount }, () => ({
          boardCellType: 'empty' as const,
        }))}
      />
    );
    // Each cell renders a div with a data-pos attribute
    const cells = container.querySelectorAll('[data-pos]');
    expect(cells).toHaveLength(cellCount);
  });

  it('assigns the correct y coordinate to each cell', () => {
    const y = BoardY(3);
    const { container } = render(
      <GameBoardRow
        y={y}
        cells={[{ boardCellType: 'empty' }, { boardCellType: 'empty' }]}
      />
    );
    const cells = container.querySelectorAll('[data-pos]');
    expect(cells[0].getAttribute('data-pos')).toBe('0-3');
    expect(cells[1].getAttribute('data-pos')).toBe('1-3');
  });
});
