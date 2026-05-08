import { BoardX, BoardY } from '@intercept-game/game';
import { Meta, Story } from '@storybook/react';
import { GameBoardRow, GameBoardRowProps } from './game-board-row';

export default {
  component: GameBoardRow,
  title: 'GameBoardRow',
  argTypes: {
    onClick: { action: 'onClick' },
    onHover: { action: 'onHover' },
  },
} as Meta;

const Template: Story<GameBoardRowProps> = (args) => (
  <GameBoardRow {...args} />
);

export const Default = Template.bind({});
Default.args = {
  y: BoardY(0),
  cells: [
    { boardCellType: 'empty' },
    { boardCellType: 'can-move' },
    {
      boardCellType: 'plane',
      direction: 'north',
      boardHeight: 'in-flight',
    },
    { boardCellType: 'aa' },
    { boardCellType: 'bones' },
  ],
};

export const AllEmpty = Template.bind({});
AllEmpty.args = {
  y: BoardY(1),
  cells: Array.from({ length: 10 }, () => ({ boardCellType: 'empty' as const })),
};
