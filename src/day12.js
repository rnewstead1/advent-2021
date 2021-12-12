const { getLines } = require('./helpers');

const START = 'start';
const DESTINATION = 'end';

const buildCaveMap = (lines) => {
  const caveMap = {};
  lines.forEach(line => {
    const [cave1, cave2] = line.split('-');
    caveMap[cave1] = [...(caveMap[cave1] || []), cave2];
    if (!(cave1 === START || cave2 === DESTINATION)) {
      caveMap[cave2] = [...(caveMap[cave2] || []), cave1];
    }
  });
  return caveMap;
};

const findRoute = (caveMap, routeSoFar) => {
  const cave = routeSoFar[routeSoFar.length - 1];
  if (cave === DESTINATION) {
    return routeSoFar.join();
  }
  return caveMap[cave]
    .filter(cave => cave.toUpperCase() === cave || !routeSoFar.includes(cave))
    .flatMap(cave => findRoute(caveMap, [...routeSoFar, cave]));
};

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    distinctPaths: () => {
      const caveMap = buildCaveMap(lines);
      const routes = findRoute(caveMap, [START]);

      return routes.length;
    },
  }
}