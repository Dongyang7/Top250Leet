/*
 * @lc app=leetcode id=54 lang=javascript
 *
 * [54] Spiral Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let [m, n] = [matrix.length, matrix[0].length];
  let [level, res] = [0, []];
  while (level < Math.min(Math.ceil(m / 2), Math.ceil(n / 2))) {
    let colIdx = level;
    while (colIdx <= n - level - 1) {
      res.push(matrix[level][colIdx]);
      colIdx++;
    }
    let rowIdx = level + 1;
    while (rowIdx <= m - level - 2) {
      res.push(matrix[rowIdx][n - level - 1]);
      rowIdx++;
    }
    if (m - level - 1 !== level) {
      colIdx = n - level - 1;
      while (colIdx >= level) {
        res.push(matrix[m - level - 1][colIdx]);
        colIdx--;
      }
    }
    if (n - level - 1 !== level) {
      rowIdx = m - level - 2;
      while (rowIdx > level) {
        res.push(matrix[rowIdx][level]);
        rowIdx--;
      }
    }
    level++;
  }
  return res;
};
// @lc code=end
