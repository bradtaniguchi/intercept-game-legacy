import { BoardX, BoardY } from '@intercept-game/game';
import { Meta, Story } from '@storybook/react';
import { GameBoardCell, GameBoardCellProps } from './game-board-cell';

export default {
  component: GameBoardCell,
  title: 'GameBoardCell',
  argTypes: {
    onClick: { action: 'onClick' },
    onHover: { action: 'onHover' },
  },
} as Meta;

const Template: Story<GameBoardCellProps> = (args) => (
  <GameBoardCell {...args} />
);

const baseLocation = { x: BoardX(0), y: BoardY(0) };

export const Empty = Template.bind({});
Empty.args = { ...baseLocation, boardCellType: 'empty' };

export const CanMove = Template.bind({});
CanMove.args = { ...baseLocation, boardCellType: 'can-move' };

export const PlaneNorth = Template.bind({});
PlaneNorth.args = {
  ...baseLocation,
  boardCellType: 'plane',
  direction: 'north',
  boardHeight: 'in-flight',
};

export const PlaneEast = Template.bind({});
PlaneEast.args = {
  ...baseLocation,
  boardCellType: 'plane',
  direction: 'east',
  boardHeight: 'in-flight',
};

export const PlaneSouth = Template.bind({});
PlaneSouth.args = {
  ...baseLocation,
  boardCellType: 'plane',
  direction: 'south',
  boardHeight: 'in-flight',
};

export const PlaneWest = Template.bind({});
PlaneWest.args = {
  ...baseLocation,
  boardCellType: 'plane',
  direction: 'west',
  boardHeight: 'in-flight',
};

export const PlaneGrounded = Template.bind({});
PlaneGrounded.args = {
  ...baseLocation,
  boardCellType: 'plane',
  direction: 'north',
  boardHeight: 'ground',
};

export const AntiAircraft = Template.bind({});
AntiAircraft.args = { ...baseLocation, boardCellType: 'aa' };

export const Bones = Template.bind({});
Bones.args = { ...baseLocation, boardCellType: 'bones' };
