/*
 * @lc app=leetcode id=1466 lang=javascript
 *
 * [1466] Reorder Routes to Make All Paths Lead to the City Zero
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
  const hash = {};
  let res = 0;
  for (let i = 0; i < n - 1; i++) {
    if (hash[connections[i][0]] === undefined) {
      hash[connections[i][0]] = [-connections[i][1]];
    } else {
      hash[connections[i][0]].push(-connections[i][1]);
    }
    if (hash[connections[i][1]] === undefined) {
      hash[connections[i][1]] = [connections[i][0]];
    } else {
      hash[connections[i][1]].push(connections[i][0]);
    }
  }
  const visited = new Array(n).fill(false);
  const dfs = (cityId) => {
    if (cityId < 0 && !visited[-cityId]) {
      res++;
    }
    cityId = Math.abs(cityId);
    if (!visited[cityId]) {
      visited[cityId] = true;
      let nextLevel = hash[cityId];
      for (let j = 0; j < nextLevel.length; j++) {
        dfs(nextLevel[j]);
      }
    }
  };
  dfs(0);
  return res;
};
// @lc code=end
