import {
  mouse,
  Button,
  up,
  down,
  left,
  right,
  Point,
  straightTo,
} from '@nut-tree/nut-js';

const DegreesToRadians = (degrees: number) => degrees * 0.01745329252;

export const drawCircle = async (radiusPx: number) => {
  const startMousePosition = await mouse.getPosition();
  const circleCenterPosition = new Point(
    startMousePosition.x,
    startMousePosition.y + radiusPx,
  );

  let angle = 0;
  const degreeStep = 1;
  let newX, newY;

  while (angle <= 360) {
    newX = Math.round(
      circleCenterPosition.x + radiusPx * Math.cos(DegreesToRadians(angle)),
    );
    newY = Math.round(
      circleCenterPosition.y + radiusPx * Math.sin(DegreesToRadians(angle)),
    );
    await mouse.move(straightTo(new Point(newX, newY)));
    if (angle === 0) {
      await mouse.pressButton(Button.LEFT);
    }
    angle += degreeStep;
  }

  await mouse.releaseButton(Button.LEFT);
};

export const drawSquare = async (widthPx: number) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(widthPx));
  await mouse.move(down(widthPx));
  await mouse.move(left(widthPx));
  await mouse.move(up(widthPx));
  await mouse.releaseButton(Button.LEFT);
};

export const drawRectangle = async (widthPx: number, lengthPx: number) => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(widthPx));
  await mouse.move(down(lengthPx));
  await mouse.move(left(widthPx));
  await mouse.move(up(lengthPx));
  await mouse.releaseButton(Button.LEFT);
};
