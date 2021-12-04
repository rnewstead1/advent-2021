const { expect } = require('chai');

const initDay4 = require('../src/day04')

const DATA_FILE = __dirname + '/data/day04.txt';

describe('day 4', () => {
  let day4;

  before(async () => {
    day4 = await initDay4(DATA_FILE);
  });

  it('should return final score of 4512', () => {
    expect(day4.finalScore()).to.equal(4512);
  });
})