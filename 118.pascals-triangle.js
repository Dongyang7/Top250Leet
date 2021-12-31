/*
 * @lc app=leetcode id=118 lang=javascript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let res = [];
  for (let i = 0; i < numRows; i++) {
    let curRes = [];
    for (let j = 0; j < i + 1; j++) {
      if (j === 0 || j === i) {
        curRes.push(1);
      } else {
        curRes.push(res[i - 1][j - 1] + res[i - 1][j]);
      }
    }
    res.push(curRes);
  }
  return res;
};
// @lc code=end
