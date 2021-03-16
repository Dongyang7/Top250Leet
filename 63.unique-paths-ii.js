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
/** there has only been one row, which had internally been referenced m times. So when I changed the first index in "the first" row, it effectively changed all rows.
Bottom line: DON'T use Array.fill to create multi-dimensional arrays! */
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
// with correct 2D array building method:
var uniquePathsWithObstacles = function (obstacleGrid) {
  if (!obstacleGrid) return;
  let m = obstacleGrid.length;
  if (!m) return;
  let n = obstacleGrid[0].length;
  if (!n) return;
  const dp = Array.from(Array(m), () => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) {
      break;
    }
    dp[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) {
      break;
    }
    dp[0][j] = 1;
  }
  console.log(dp);
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

//with 1D dp array
var uniquePathsWithObstacles = function (obstacleGrid) {
  if (!obstacleGrid) return;
  let m = obstacleGrid.length;
  if (!m) return;
  let n = obstacleGrid[0].length;
  if (!n) return;
  const dp = new Array(n).fill(0);
  if (obstacleGrid[0][0] !== 1) dp[0] = 1;
  else return 0;
  for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
      if (obstacleGrid[x][y] === 1) {
        dp[y] = 0;
      } else if (y === 0) {
        continue;
      } else {
        dp[y] += dp[y - 1];
      }
      console.log(dp);
    }
  }
  return dp[n - 1];
};
// @lc code=end
