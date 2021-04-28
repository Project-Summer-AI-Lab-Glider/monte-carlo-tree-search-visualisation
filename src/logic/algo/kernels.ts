export const ubcKernel = (
  meanNodeValue: number,
  visitsOfNode: number,
  visitsOfParent: number
): number => {
  const explorationWeight = 0.1;
  const logVisitsOfParent = Math.log(visitsOfParent);
  return meanNodeValue + explorationWeight * Math.sqrt(logVisitsOfParent / visitsOfNode);
};
