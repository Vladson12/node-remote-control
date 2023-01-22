import {
  mouseDown,
  mouseLeft,
  mousePosition,
  mouseRight,
  mouseUp,
} from './handlers';

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
];
