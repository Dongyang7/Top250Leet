/*
 * @lc app=leetcode id=1631 lang=javascript
 *
 * [1631] Path With Minimum Effort
 */

// @lc code=start
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const [m, n] = [heights.length, heights[0].length];
  const [memo, visited] = [
    Array.from(Array(m), () => Array(n).fill(-1)),
    Array.from(Array(m), () => Array(n).fill(false)),
  ];
  memo[m - 1][n - 1] = 0;
  const helper = (i, j, curVisited) => {
    if (i === m - 1 && j === n - 1) return 0;
    // if (memo[i][j] >= 0) return memo[i][j];
    // if (!curVisited[i][j]) {
    curVisited[i][j] = true;
    let nextLevel = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ];
    let curMin = Number.MAX_SAFE_INTEGER;
    for (let [x, y] of nextLevel) {
      if (x >= 0 && x < m && y >= 0 && y < n && !curVisited[x][y]) {
        curMin = Math.min(
          Math.max(
            Math.abs(heights[i][j] - heights[x][y]),
            helper(x, y, curVisited)
          ),
          curMin
        );
      }
    }
    // memo[i][j] = curMin;
    return curMin;
    // }
  };
  return helper(0, 0, visited);
};
minimumEffortPath([
  [1, 2, 3],
  [3, 8, 4],
  [5, 3, 5],
]);
// var minimumEffortPath = function (heights) {
//     const [m, n] = [heights.length, heights[0].length];
//     const dp = Array.from(Array(m), ()=>Array(n).fill(Number.MAX_SAFE_INTEGER))

// }
// @lc code=end
