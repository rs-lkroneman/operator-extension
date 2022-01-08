
export const normalize = (item) => item.toLowerCase().split('_').join(' ');

export const createRange = (value, step, count) => {
  const list = [];
  for (let i = 0; i < count; i++, value += step) {
    list.push(value);
  }

  return list;
};
