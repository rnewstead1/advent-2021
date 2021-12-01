const { readFile } = require('fs').promises

const getLines = (filename) =>
  readFile(filename, { encoding: 'utf8' })
    .then((contents) => contents.toString().trim().split('\n'));

const getNumberOfLargerMeasurements = async (dataFile) => {
  const depths = await getLines(dataFile)
  const depthsOffsetByOne = depths.slice(1, depths.length)

  const areMeasurementsLarger = [...Array(depthsOffsetByOne.length).keys()]
    .map((i) => {
      return parseInt(depths[i]) < parseInt(depthsOffsetByOne[i])
    });

  return areMeasurementsLarger.filter(Boolean).length;
}

module.exports = {
  getNumberOfLargerMeasurements,
}