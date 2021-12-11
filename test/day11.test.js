const { expect } = require('chai');

const initDay11 = require('../src/day11')

const DATA_FILE = __dirname + '/data/day11.txt';

describe('day 11', () => {
  let day11;

  before(async () => {
    day11 = await initDay11(DATA_FILE);
  });

  it('should return 35 flashes after 2 steps', () => {
    expect(day11.flashCount(2)).to.equal(35);
  });

  it('should return 204 flashes after 10 steps', () => {
    expect(day11.flashCount(10)).to.equal(204);
  });

  it('should return 1656 flashes after 100 steps', () => {
    expect(day11.flashCount(100)).to.equal(1656);
  });
})