/*
 * @lc app=leetcode id=63 lang=javascript
 *
 * [63] Unique Paths II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  if (!obstacleGrid) return;
  let m = obstacleGrid.length;
  if (!m) return;
  let n = obstacleGrid[0].length;
  if (!n) return;
  const dp = new Array(m).fill(new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) {
      break;
    }
    dp[i][0] = 1;
    console.log("?", dp); //why every row is modified at same time????
  }
  console.log(dp);
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) {
      break;
    }
    dp[0][j] = 1;
  }
  for (let x = 1; x < m; x++) {
    for (let y = 1; y < n; y++) {
      if (obstacleGrid[x][y] === 0) {
        dp[x][y] = Math.max(dp[x - 1][y], 0) + Math.max(dp[x][y - 1], 0);
      } else {
        dp[x][y] = 0;
      }
    }
  }
  return dp[m - 1][n - 1];
};
// @lc code=end
