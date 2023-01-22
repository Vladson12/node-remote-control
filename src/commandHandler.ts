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
      } executes`,
    );

    if (command.args === 0) {
      await command.handler();
    } else {
      await command.handler(...numCommandArgs);
    }
    let res = commandName;
    if (numCommandArgs.length !== 0) {
      res += '_' + numCommandArgs.join('_');
    }
    return res;
  } catch (err) {
    throw new Error(`Something went wrong during command execution`);
  }
};
