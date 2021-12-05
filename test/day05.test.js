const { expect } = require('chai');

const initDay5 = require('../src/day05')

const DATA_FILE = __dirname + '/data/day05.txt';

describe('day 5', () => {
  let day5;

  before(async () => {
    day5 = await initDay5(DATA_FILE);
  });

  it('should return 5 points of at least two overlapping lines', () => {
    expect(day5.atLeastTwoOverlappingLines()).to.equal(5);
  });
})