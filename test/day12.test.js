const { expect } = require('chai');

const initDay12 = require('../src/day12')

const DATA_FILE = __dirname + '/data/day12.txt';

describe('day 12', () => {
  let day12;

  before(async () => {
    day12 = await initDay12(DATA_FILE);
  });

  it('should return 10 distinct paths', () => {
    expect(day12.distinctPaths()).to.equal(10);
  });
})