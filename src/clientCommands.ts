import { drawCircle, drawRectangle, drawSquare } from './handlers/drawHandlers';
import {
  mouseDown,
  mouseLeft,
  mousePosition,
  mouseRight,
  mouseUp,
} from './handlers/mouseHandlers';
import { makeScreenshot } from './handlers/screenHandlers';

class Command {
  constructor(
    public name: string,
    public args: number,
    public handler: Function,
  ) {}
}

export const commands: Command[] = [
  new Command('mouse_up', 1, mouseUp),
  new Command('mouse_down', 1, mouseDown),
  new Command('mouse_left', 1, mouseLeft),
  new Command('mouse_right', 1, mouseRight),
  new Command('mouse_position', 0, mousePosition),

  new Command('draw_circle', 1, drawCircle),
  new Command('draw_square', 1, drawSquare),
  new Command('draw_rectangle', 2, drawRectangle),

  new Command('prnt_scrn', 0, makeScreenshot),
];
