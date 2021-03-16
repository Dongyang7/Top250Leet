/*
 * @lc app=leetcode id=48 lang=javascript
 *
 * [48] Rotate Image
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.ceil(n / 2); j++) {
      [
        matrix[i][j],
        matrix[j][n - 1 - i],
        matrix[n - 1 - i][n - 1 - j],
        matrix[n - 1 - j][i],
      ] = [
        matrix[n - 1 - j][i],
        matrix[i][j],
        matrix[j][n - 1 - i],
        matrix[n - 1 - i][n - 1 - j],
      ];
    }
  }
};
// @lc code=end
