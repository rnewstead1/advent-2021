const { expect } = require('chai');

const initDay8 = require('../src/day08')

const DATA_FILE = __dirname + '/data/day08.txt';

describe('day 8', () => {
  let day8;

  before(async () => {
    day8 = await initDay8(DATA_FILE);
  });

  it('should return a count of 27 digits with unique identifiers', () => {
    expect(day8.digitsWithUniqueIdentifiersCount()).to.equal(26);
  });
})