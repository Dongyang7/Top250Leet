/*
 * @lc app=leetcode id=119 lang=javascript
 *
 * [119] Pascal's Triangle II
 */

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  let dp = [];
  for (let i = 0; i < rowIndex; i++) {
    let curRes = [];
    for (let j = 0; j < i + 1; j++) {
      if (j === 0 || j === i) {
        curRes.push(1);
      } else {
        curRes.push(dp[i - 1][j - 1] + dp[i - 1][j]);
      }
    }
    dp.push(curRes);
  }
  return dp[rowIndex - 1];
};
// @lc code=end
