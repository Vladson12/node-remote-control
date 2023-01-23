import { RawData } from 'ws';
import { commands } from './clientCommands';

export const handleMessage = async (message: RawData) => {
  const [commandName, ...stringCommandArgs] = message.toString().split(' ');
  const numCommandArgs = stringCommandArgs.map((stringArg) => +stringArg);
  if (!commandName) {
    throw new Error('Command not found!');
  }

  const command = commands.find((command) => command.name === commandName);

  if (!command) {
    throw new Error(`Command \'${commandName}\' unsupported`);
  }
  if (command.args !== numCommandArgs.length) {
    throw new Error(
      `Command \'${commandName}\' must have ${command.args} arg(s)`,
    );
  }

  try {
    console.log(
      `Command ${command.name}${
        numCommandArgs.length === 0 ? '' : ` ${numCommandArgs.join(' ')}`
      } executing...`,
    );

    const commandResult = await command.handler(...numCommandArgs);

    let res = commandName;
    if (commandResult) {
      switch (command.name) {
        case 'mouse_position':
          res += `_x:${commandResult.x},y:${commandResult.y}`;
          break;
        case 'prnt_scrn':
          res += ` ${commandResult}`;
          break;
        default:
          res += ` ${commandResult}`;
      }
    }

    if (numCommandArgs.length !== 0) {
      res += '_' + numCommandArgs.join('_');
    }
    return res;
  } catch (err) {
    throw new Error(`Something went wrong during command execution`);
  }
};
