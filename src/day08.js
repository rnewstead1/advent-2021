const { getLines } = require('./helpers');

const segmentCountMap = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    digitsWithUniqueIdentifiersCount: () => {
      const outputs = lines.map(line => line.split('|')[1].trim().split(' '));
      const digitsOnly = outputs
        .map(output => output
          .map(signal => segmentCountMap[signal.length] || signal))
        .map((mapped => mapped.filter(Number.isInteger)));
      return digitsOnly.reduce((acc, curr) => acc + curr.length, 0);
    }
  }
}

