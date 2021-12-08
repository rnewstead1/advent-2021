const { getLines, numericArray } = require('./helpers');

const segmentCountMap = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
}

const difference = (setA, setB) => {
  let _difference = new Set(setA);
  for (let elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem)
    } else {
      _difference.add(elem)
    }
  }
  return _difference;
}

const areEqual = (setA, setB) => setA.size === setB.size && [...setA].every(value => setB.has(value));

const unknownFrom = (remaining, known) => [...(remaining.map(r => difference(r, new Set(known))).find(d => d.size === 1))][0];

const findOccurrences = (occurrences, count) => Object.keys(occurrences.find(occurrence => occurrence[Object.keys(occurrence)[0]] === count))[0];

const buildDigitMap = (pattern) => {
  const digitMap = {};
  const found = [];
  pattern.forEach(p => {
    const segmentCount = segmentCountMap[p.size];
    if (segmentCount) {
      digitMap[segmentCount] = p;
      found.push(p);
    }
  });
  const remaining = pattern.filter(p => !found.includes(p));
  const top = [...difference(digitMap[1], digitMap[7])][0];
  const bottom = unknownFrom(remaining, [...digitMap[4], top]);
  const middle = unknownFrom(remaining, [...digitMap[7], bottom]);
  const occurrences = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    .map(letter => ({ [letter]: pattern.reduce((acc, curr) => acc + (curr.has(letter) ? 1 : 0), 0) }));
  const topLeft = findOccurrences(occurrences, 6);
  const bottomLeft = findOccurrences(occurrences, 4);
  const bottomRight = findOccurrences(occurrences, 9);
  const topRight = [...difference(digitMap[8], new Set([top, bottom, middle, topLeft, bottomLeft, bottomRight]))][0];

  digitMap[0] = new Set([top, topRight, bottomRight, bottom, bottomLeft, topLeft]);
  digitMap[2] = new Set([top, topRight, middle, bottomLeft, bottom]);
  digitMap[3] = new Set([top, topRight, middle, bottomRight, bottom]);
  digitMap[5] = new Set([top, topLeft, middle, bottomRight, bottom]);
  digitMap[6] = new Set([top, topLeft, middle, bottomRight, bottom, bottomLeft]);
  digitMap[9] = new Set([top, topLeft, middle, topRight, bottomRight, bottom]);

  return digitMap;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const outputs = lines.map(line => line.split('|')[1].trim().split(' '));

  return {
    digitsWithUniqueIdentifiersCount: () => {
      const digitsOnly = outputs
        .map(output => output
          .map(signal => segmentCountMap[signal.length] || signal))
        .map((mapped => mapped.filter(Number.isInteger)));
      return digitsOnly.reduce((acc, curr) => acc + curr.length, 0);
    },
    totalOutputValues: () => {
      const patterns = lines.map(line => line.split('|')[0].trim().split(' ').map(p => new Set(p.split(''))));
      const digitMaps = patterns.map((pattern => buildDigitMap(pattern)));

      const totals = numericArray(lines.length).map(i => {
        const output = outputs[i];
        const digitMap = digitMaps[i];
        return parseInt(output
          .map(o => Object.keys(digitMap).find(key => areEqual(digitMap[key], new Set(o.split(''))))).join(''));
      });
      return totals.reduce((acc, curr) => acc + curr, 0)
    }
  }
}

