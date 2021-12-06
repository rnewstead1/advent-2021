const { getLines, numericArray } = require('./helpers');

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const originalFish = lines[0].split(",").map(i => parseInt(i));

  return {
    fishCount: (days) => {
      const countFish = (fish, day=0) => {
        if (day === days) {
          return fish;
        }
        const newFish = [];
        fish.forEach(f => {
          if (f === 0) {
            newFish.push(6, 8);
          } else {
            newFish.push(f - 1);
          }
        });
        return countFish(newFish, day + 1);
      }

      return countFish([...originalFish]).length;
    },
    fishCountPart2: (days) => {
      const fishCount = {}
      numericArray(9).forEach(i => {
        fishCount[i] = 0;
      })
      originalFish.forEach(x => {
        fishCount[x]++;
      })

      let day = 1
      while (day <= days) {
        const fishReadyToCreate = fishCount[0];
        fishCount[0] = fishCount[1];
        fishCount[1] = fishCount[2];
        fishCount[2] = fishCount[3];
        fishCount[3] = fishCount[4];
        fishCount[4] = fishCount[5];
        fishCount[5] = fishCount[6];
        fishCount[6] = fishCount[7] + fishReadyToCreate;
        fishCount[7] = fishCount[8];
        fishCount[8] = fishReadyToCreate;
        day++;
      }
      return Object.values(fishCount).reduce((acc, curr) => acc + curr, 0);
    },
  }
}

