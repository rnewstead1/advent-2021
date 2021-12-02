const { expect } = require('chai');

const initDay1 = require('../src/day01')

const DATA_FILE = __dirname + '/data/day01.txt';

describe('day 1', () => {
  let day1;

  before(async () => {
    day1 = await initDay1(DATA_FILE);
  });

  it('should return 7 single increases', async () => {
    expect(day1.singleIncreaseCount()).to.equal(7);
  })

  it('should return 5 treble increases', () => {
    expect(day1.trebleIncreaseCount()).to.equal(5);
  });
})