import { mouse, up, down, left, right } from '@nut-tree/nut-js';

export const mouseUp = async (px: number) => {
  mouse.move(up(px));
};

export const mouseDown = async (px: number) => {
  mouse.move(down(px));
};

export const mouseLeft = async (px: number) => {
  mouse.move(left(px));
};

export const mouseRight = async (px: number) => {
  mouse.move(right(px));
};

export const mousePosition = async () => {
  return mouse.getPosition();
};
