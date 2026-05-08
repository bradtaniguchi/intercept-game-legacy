import { BoardX, BoardY } from '@intercept-game/game';
import { fireEvent, render } from '@testing-library/react';
import { GameBoardCell } from './game-board-cell';

const baseLocation = { x: BoardX(3), y: BoardY(4) };

describe('GameBoardCell', () => {
  it('renders an empty cell', () => {
    const { baseElement } = render(
      <GameBoardCell {...baseLocation} boardCellType="empty" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders a can-move cell', () => {
    const { baseElement } = render(
      <GameBoardCell {...baseLocation} boardCellType="can-move" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders a plane cell', () => {
    const { baseElement } = render(
      <GameBoardCell
        {...baseLocation}
        boardCellType="plane"
        direction="north"
        boardHeight="in-flight"
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders an aa cell', () => {
    const { baseElement } = render(
      <GameBoardCell {...baseLocation} boardCellType="aa" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders a bones cell', () => {
    const { baseElement } = render(
      <GameBoardCell {...baseLocation} boardCellType="bones" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('sets data-pos attribute to the board location string', () => {
    const { getByTestId } = render(
      <GameBoardCell
        {...baseLocation}
        boardCellType="empty"
        data-testid="cell"
      />
    );
    // The rendered div has data-pos, not data-testid; query by the container
    const cell = document.querySelector('[data-pos="3-4"]');
    expect(cell).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { container } = render(
      <GameBoardCell {...baseLocation} boardCellType="empty" onClick={onClick} />
    );
    fireEvent.click(container.firstChild as Element);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onHover when mouse enters', () => {
    const onHover = jest.fn();
    const { container } = render(
      <GameBoardCell
        {...baseLocation}
        boardCellType="empty"
        onHover={onHover}
      />
    );
    fireEvent.mouseEnter(container.firstChild as Element);
    expect(onHover).toHaveBeenCalledTimes(1);
  });
});
