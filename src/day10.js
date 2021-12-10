const { getLines } = require('./helpers');

const OPENING_BRACKETS_REGEX = /\[|\(|\<|\{/;

const matchBracketRegex = {
  '[': /\]/,
  '(': /\)/,
  '<': /\>/,
  '{': /\}/,
};

const invalidCharMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    syntaxErrorScore: () => {
      let invalidSyntaxScore = 0;
      lines.forEach(line => {
        const chars = line.split('');
        const stack = [];
        for (const char of chars) {
          if (char.match(OPENING_BRACKETS_REGEX)) {
            stack.push(char);
          } else {
            const lastIn = stack.pop();
            if (!char.match(matchBracketRegex[lastIn])) {
              invalidSyntaxScore += invalidCharMap[char];
              break;
            }
          }
        }
      });
      return invalidSyntaxScore;
    },
  }
}

