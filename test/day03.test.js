const { expect } = require('chai');

const initDay3 = require('../src/day03')

const DATA_FILE = __dirname + '/data/day03.txt';

describe('day 3', () => {
  let day3;

  before(async () => {
    day3 = await initDay3(DATA_FILE);
  });

  it('should return power consumption of 198', () => {
    expect(day3.powerConsumption()).to.equal(198);
  });

  it('should return life support rating of 230', () => {
    expect(day3.lifeSupportRating()).to.equal(230);
  });
})