const { expect } = require('chai');

const initDay12 = require('../src/day12')

const DATA_FILE = __dirname + '/data/day12.txt';
const MEDIUM_DATA_FILE = __dirname + '/data/day12-medium.txt';

describe('day 12', () => {
  describe('small data file', () => {
    let day12;

    before(async () => {
      day12 = await initDay12(DATA_FILE);
    });

    it('should return 10 distinct paths without revisiting small caves', () => {
      expect(day12.distinctPathsWithoutRevisitingSmallCaves()).to.equal(10);
    });

    it('should return 36 distinct paths that can revisit one small cave', () => {
      expect(day12.distinctPathsThatCanRevisitOneSmallCave()).to.equal(36);
    });
  });

  describe('medium data file', () => {
    let day12;

    before(async () => {
      day12 = await initDay12(MEDIUM_DATA_FILE);
    });

    it('should return 19 distinct paths without revisiting small caves', () => {
      expect(day12.distinctPathsWithoutRevisitingSmallCaves()).to.equal(19);
    });

    it('should return 103 distinct paths that can revisit one small cave', () => {
      expect(day12.distinctPathsThatCanRevisitOneSmallCave()).to.equal(103);
    });
  })
})