export const ChunkArray = (array, chunk) => {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, chunk));
  }
  return results;
};
