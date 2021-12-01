const { expect } = require('chai');

const { getNumberOfLargerMeasurements } = require('../src/day01')

const DATA_FILE = __dirname + '/data/day01.txt';

describe('day 1', () => {
  it('should return 7 larger measurements', async () => {
    const numberOfLargerMeasurements = await getNumberOfLargerMeasurements(DATA_FILE);

    expect(numberOfLargerMeasurements).to.equal(7);
  })
})