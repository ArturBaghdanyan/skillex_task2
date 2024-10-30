export const GenerateCombinations = (odds, select) => {
    const results = [];
    const combine = (path, start) => {
      if (path.length === select) {
        results.push(path);
        return;
      }
      for (let i = start; i < odds.length; i++) {
        combine([...path, odds[i]], i + 1);
      }
    };
    combine([], 0);
    return results;
  };