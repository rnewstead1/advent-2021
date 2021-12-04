const { expect } = require('chai');

const initDay4 = require('../src/day04')

const DATA_FILE = __dirname + '/data/day04.txt';

describe('day 4', () => {
  let day4;

  before(async () => {
    day4 = await initDay4(DATA_FILE);
  });

  it('should return final score of first board to win of 4512', () => {
    expect(day4.firstToWinFinalScore()).to.equal(4512);
  });

  it('should return final score of last board to win of 1924', () => {
    expect(day4.lastToWinFinalScore()).to.equal(1924);
  });
})