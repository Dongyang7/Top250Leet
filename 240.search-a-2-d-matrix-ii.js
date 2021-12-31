/*
 * @lc app=leetcode id=240 lang=javascript
 *
 * [240] Search a 2D Matrix II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let [m, n] = [matrix.length, matrix[0].length];
  let [r, c] = [m - 1, 0];
  while (r >= 0 && c < n) {
    if (matrix[r][c] === target) {
      return true;
    } else if (matrix[r][c] > target) {
      r--;
    } else {
      c++;
    }
  }
  return false;
};
// @lc code=end
