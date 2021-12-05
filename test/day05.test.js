const { expect } = require('chai');

const initDay5 = require('../src/day05')

const DATA_FILE = __dirname + '/data/day05.txt';

describe('day 5', () => {
  let day5;

  before(async () => {
    day5 = await initDay5(DATA_FILE);
  });

  it('should return 5 points of at least two overlapping horizontal and vertical lines', () => {
    expect(day5.overlappingHorizontalAndVerticalLines()).to.equal(5);
  });

  it('should return 12 points of at least two overlapping horizontal, vertical and diagonal lines', () => {
    expect(day5.overlappingAnyDirection()).to.equal(12);
  });
})