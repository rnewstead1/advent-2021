const { expect } = require('chai');

const initDay7 = require('../src/day07')

const DATA_FILE = __dirname + '/data/day07.txt';

describe('day 7', () => {
  let day7;

  before(async () => {
    day7 = await initDay7(DATA_FILE);
  });

  it('should return fuel spent of 37', () => {
    expect(day7.fuelSpent()).to.equal(37);
  });
})