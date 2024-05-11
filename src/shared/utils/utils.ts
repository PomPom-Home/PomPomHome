export const increase = (count: number) => {
  return count + 1;
};

export const decrease = (count: number) => {
  return count - 1;
};

export const getKeys = <T extends object>(obj: T): Array<keyof T> =>
  Object.keys(obj) as Array<keyof T>;
