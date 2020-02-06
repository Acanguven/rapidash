const distinctByProp = <T>(arr: T[], byId: keyof T): T[] => {
  const map = new Map();
  arr.forEach(val => {
    map.set(val[byId], val);
  });
  return Array.from(map.values());
};

export { distinctByProp };
