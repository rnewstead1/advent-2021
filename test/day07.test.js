const { expect } = require('chai');

const initDay7 = require('../src/day07')

const DATA_FILE = __dirname + '/data/day07.txt';

describe('day 7', () => {
  let day7;

  before(async () => {
    day7 = await initDay7(DATA_FILE);
  });

  it('should return linear fuel spent of 37', () => {
    expect(day7.fuelSpentLinear()).to.equal(37);
  });

  it('should return variable fuel spent of 168', () => {
    expect(day7.fuelSpentVariable()).to.equal(168);
  });
})