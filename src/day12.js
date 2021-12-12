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

const cannotRevisitSmallCaves = (cave, routeSoFar) => cave.toUpperCase() === cave || !routeSoFar.includes(cave);

const hasNotAlreadyVisitedASmallCave = (cave, routeSoFar) => {
  const smallCavesVisited = routeSoFar.filter(cave => cave.toLowerCase() === cave);
  return smallCavesVisited.length === new Set(smallCavesVisited).size;
}

const isAllowedToRevisitASmallCave = (cave, routeSoFar) => cave !== START
  ? hasNotAlreadyVisitedASmallCave(cave, routeSoFar) : false;

const canRevisitASmallCave = (cave, routeSoFar) => cannotRevisitSmallCaves(cave, routeSoFar)
  || isAllowedToRevisitASmallCave(cave, routeSoFar);

const findRoute = (caveMap, routeSoFar, followsRules) => {
  const cave = routeSoFar[routeSoFar.length - 1];
  if (cave === DESTINATION) {
    return routeSoFar.join();
  }
  return caveMap[cave]
    .filter(cave => followsRules(cave, routeSoFar))
    .flatMap(cave => findRoute(caveMap, [...routeSoFar, cave], followsRules));
};

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const caveMap = buildCaveMap(lines);

  return {
    distinctPathsWithoutRevisitingSmallCaves: () => {
      const routes = findRoute(caveMap, [START], cannotRevisitSmallCaves);
      return routes.length;
    },
    distinctPathsThatCanRevisitOneSmallCave: () => {
      const routes = findRoute(caveMap, [START], canRevisitASmallCave);
      return routes.length;
    },
  }
}