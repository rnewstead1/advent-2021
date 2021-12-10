const { expect } = require('chai');

const initDay10 = require('../src/day10')

const DATA_FILE = __dirname + '/data/day10.txt';

describe('day 10', () => {
  let day10;

  before(async () => {
    day10 = await initDay10(DATA_FILE);
  });

  it('should return a syntax error score of 26397', () => {
    expect(day10.syntaxErrorScore()).to.equal(26397);
  });

  it('should return a completion string middle score of 288957', () => {
    expect(day10.completionStringMiddleScore()).to.equal(288957);
  });
})