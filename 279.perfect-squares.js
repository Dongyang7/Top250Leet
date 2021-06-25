/*
 * @lc app=leetcode id=279 lang=javascript
 *
 * [279] Perfect Squares
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = new Array(n + 1);
  for (let i = 1; i <= n; i++) {
    if (Number.isInteger(Math.sqrt(i))) {
      dp[i] = 1;
    } else {
      let min = Number.MAX_SAFE_INTEGER;
      for (let j = 1; j <= Math.floor(Math.sqrt(i)); j++) {
        // for (let j = 1; j <= i/2; j++) {
        min = Math.min(min, 1 + dp[i - j ** 2]);
      }
      dp[i] = min;
    }
  }
  return dp[n];
};
// @lc code=end
