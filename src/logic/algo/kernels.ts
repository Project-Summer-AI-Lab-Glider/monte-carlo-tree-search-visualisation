export const ubcKernel = (
  meanNodeValue: number,
  visitsOfNode: number,
  visitsOfParent: number
): number => {
  var explorationWeight = 0.1;
  var logVisitsOfParent = Math.log(visitsOfParent);
  return meanNodeValue + explorationWeight * Math.sqrt(logVisitsOfParent / visitsOfNode);
};
