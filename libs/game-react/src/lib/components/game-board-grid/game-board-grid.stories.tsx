import {
  BoardX,
  BoardY,
  createGrid,
  updateGrid,
} from '@intercept-game/game';
import { Meta, Story } from '@storybook/react';
import { GameBoardGrid, GameBoardGridProps } from './game-board-grid';

export default {
  component: GameBoardGrid,
  title: 'GameBoardGrid',
  argTypes: {
    onHover: { action: 'onHover' },
    onSelect: { action: 'onSelect' },
    onEnemySelect: { action: 'onEnemySelect' },
    onMove: { action: 'onMove' },
    onInterceptSelect: { action: 'onInterceptSelect' },
    onIntercept: { action: 'onIntercept' },
  },
} as Meta;

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

const gridWithPlanes = updateGrid({
  board: updateGrid({
    board: emptyGrid,
    location: { x: BoardX(2), y: BoardY(3) },
    cell: 'plane',
  }),
  location: { x: BoardX(7), y: BoardY(8) },
  cell: 'plane',
});

const northPlane = {
  id: 'north-1' as never,
  x: BoardX(2),
  y: BoardY(3),
  height: 'in-flight' as const,
  direction: 'north' as const,
  player: 'player-north' as never,
  squadron: 'foo' as never,
  downed: [],
  isDowned: false,
};

const southPlane = {
  id: 'south-1' as never,
  x: BoardX(7),
  y: BoardY(8),
  height: 'in-flight' as const,
  direction: 'south' as const,
  player: 'player-south' as never,
  squadron: 'bar' as never,
  downed: [],
  isDowned: false,
};

const Template: Story<GameBoardGridProps> = (args) => (
  <GameBoardGrid {...args} />
);

export const EmptyBoard = Template.bind({});
EmptyBoard.args = {
  boardGrid: emptyGrid,
  planes: { north: [], south: [] },
  currentFaction: 'north',
  handlers: defaultHandlers,
};

export const WithPlanes = Template.bind({});
WithPlanes.args = {
  boardGrid: gridWithPlanes,
  planes: { north: [northPlane], south: [southPlane] },
  currentFaction: 'north',
  handlers: defaultHandlers,
};

export const AsSouthFaction = Template.bind({});
AsSouthFaction.args = {
  boardGrid: gridWithPlanes,
  planes: { north: [northPlane], south: [southPlane] },
  currentFaction: 'south',
  handlers: defaultHandlers,
};
