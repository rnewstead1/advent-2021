const { expect } = require('chai');

const initDay8 = require('../src/day08')

const DATA_FILE = __dirname + '/my_input/day08.txt';

describe('day 8', () => {
  let day8;

  before(async () => {
    day8 = await initDay8(DATA_FILE);
  });

  it('should return a count of 27 digits with unique identifiers', () => {
    expect(day8.digitsWithUniqueIdentifiersCount()).to.equal(26);
  });

  it('should return 61229 output values', () => {
    expect(day8.totalOutputValues()).to.equal(61229);
  });
})