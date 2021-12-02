const { getLines } = require('./file-helper');

/*forward 5 adds 5 to your horizontal position, a total of 5.
down 5 adds 5 to your depth, resulting in a value of 5.
forward 8 adds 8 to your horizontal position, a total of 13.
up 3 decreases your depth by 3, resulting in a value of 2.
down 8 adds 8 to your depth, resulting in a value of 10.
forward 2 adds 2 to your horizontal position, a total of 15.*/

const instructionKey = {
  forward: ([x, y], val) => [x + val, y],
  down: ([x, y], val) => [x, y + val],
  up: ([x, y], val) => [x, y - val],
};

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    position: () => {
      const instructions = lines
        .map(line => line.split(' '))
        .map(([direction, val]) => [direction, parseInt(val)]);
      const finalPosition = instructions
        .reduce((acc, [direction, val]) => instructionKey[direction](acc, val), [0, 0]);
      return finalPosition[0] * finalPosition[1];
    }
  }
}