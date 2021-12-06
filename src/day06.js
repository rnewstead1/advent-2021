const { getLines } = require('./helpers');

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const originalFish = lines[0].split(",").map(i => parseInt(i));

  return {
    fishCount: (days) => {
      const countFish = (fish, day) => {
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
      return countFish([...originalFish], 0).length;
    },
  }
}

