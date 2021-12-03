const { getLines } = require('./helpers');

const commandKeySimple = {
  forward: ([x, y], val) => [x + val, y],
  down: ([x, y], val) => [x, y + val],
  up: ([x, y], val) => [x, y - val],
};

const commandKeyWithAim = {
  forward: ([x, y, a], val) => [x + val, y + (val * a), a],
  down: ([x, y, a], val) => [x, y, a + val],
  up: ([x, y, a], val) => [x, y, a - val],
};

const applyCommands = (instructions, commandKey, position) => {
  const [x, y] = instructions.reduce((position, [command, val]) => commandKey[command](position, val), position);
  return x * y;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const instructions = lines
    .map(line => line.split(' '))
    .map(([command, val]) => [command, parseInt(val)]);

  return {
    positionSimple: () => applyCommands(instructions, commandKeySimple, [0, 0]),
    positionWithAim: () => applyCommands(instructions, commandKeyWithAim, [0,0,0]),
  }
}