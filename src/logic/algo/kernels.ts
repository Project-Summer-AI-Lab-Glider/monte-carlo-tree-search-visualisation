export const ubcKernel = (
  meanNodeValue: number,
  visitsOfNode: number,
  visitsOfParent: number
): number => {
  const explorationWeight = 0.1;
  const logVisitsOfParent = Math.log(visitsOfParent);
  if (visitsOfNode === 0){
    throw Error("Division by zero is immposible!");
  }
  return meanNodeValue + explorationWeight * Math.sqrt(logVisitsOfParent / visitsOfNode);
};
