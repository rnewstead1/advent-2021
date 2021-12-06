const { expect } = require('chai');

const initDay6 = require('../src/day06')

const DATA_FILE = __dirname + '/data/day06.txt';

describe('day 6', () => {
  let day6;

  before(async () => {
    day6 = await initDay6(DATA_FILE);
  });

  it('should return a total of 26 fish after 18 days', () => {
    expect(day6.fishCount(18)).to.equal(26);
  });

  it('should return return a total of 5934 fish after 80 days', () => {
    expect(day6.fishCount(80)).to.equal(5934);
  });
})