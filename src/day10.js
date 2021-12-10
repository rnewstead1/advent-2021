const { getLines } = require('./helpers');

const OPENING_BRACKETS_REGEX = /\[|\(|\<|\{/;

const bracketRegex = (bracket) => {
  return new RegExp('\\' + bracket, 'g')
}

const matchingBracket = {
  '[': ']',
  '(': ')',
  '<': '>',
  '{': '}',
};

const invalidCharMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const completionCharMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
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
            if (!char.match(bracketRegex(matchingBracket[lastIn]))) {
              invalidSyntaxScore += invalidCharMap[char];
              break;
            }
          }
        }
      });
      return invalidSyntaxScore;
    },
    completionStringMiddleScore: () => {
      const completionStrings = [];
      lines.forEach(line => {
        const chars = line.split('');
        const stack = [];
        let valid = true;
        for (const char of chars) {
          if (char.match(OPENING_BRACKETS_REGEX)) {
            stack.push(char);
          } else {
            if (!char.match(bracketRegex(matchingBracket[stack.pop()]))) {
              valid = false;
              break;
            }
          }
        }
        if (valid) {
          const completionString = [];
          while (stack.length > 0) {
            completionString.push(matchingBracket[stack.pop()]);
          }
          completionStrings.push(completionString);
        }
      });
      const scores = completionStrings
        .map(completionString => completionString
          .reduce((acc, curr) => (acc * 5) + completionCharMap[curr], 0))
        .sort((a, b) => a - b);
      const middleIndex = Math.floor(scores.length / 2);
      return scores[middleIndex];
    },
  }
}