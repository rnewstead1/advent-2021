const { expect } = require('chai');

const initDay13 = require('../src/day13')

const DATA_FILE = __dirname + '/data/day13.txt';

describe('day 13', () => {
    let day13;

    before(async () => {
      day13 = await initDay13(DATA_FILE);
    });

    it('should return 17 dots after the first fold', () => {
      expect(day13.dotsAfterFirstFold()).to.equal(17);
    });

  it('should print dots after all folds', () => {
    expect(day13.printedDotsAfterAllFolds()).to.equal('#####\n#   #\n#   #\n#   #\n#####\n');
  });
})