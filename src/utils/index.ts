export const normalize = (item) => item.toLowerCase().split("_").join(" ");

export const createRange = (
  from: number,
  step: number,
  count: number
): any[] => {
  const list: any[] = [];

  for (let i = 0; i < count; i++, from += step) {
    list.push(from);
  }

  return list;
};
