const { expect } = require('chai');

const initDay9 = require('../src/day09')

const DATA_FILE = __dirname + '/data/day09.txt';

describe('day 9', () => {
  let day9;

  before(async () => {
    day9 = await initDay9(DATA_FILE);
  });

  it('should return a low point sum of 15', () => {
    expect(day9.lowPointSum()).to.equal(15);
  });

  it('should return 1134 when multiplying the size of the three largest basins', () => {
    expect(day9.largestBasins()).to.equal(1134);
  });
})