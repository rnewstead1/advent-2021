const { expect } = require('chai');

const initDay2 = require('../src/day02')

const DATA_FILE = __dirname + '/data/day02.txt';

describe('day 2', () => {
  let day2;

  before(async () => {
    day2 = await initDay2(DATA_FILE);
  });

  it('should give a position of 150', () => {
    expect(day2.position()).to.equal(150);
  });

})