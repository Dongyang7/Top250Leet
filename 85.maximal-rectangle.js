/*
 * @lc app=leetcode id=85 lang=javascript
 *
 * [85] Maximal Rectangle
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  let [m, n] = [matrix.length, matrix[0].length];
  let dp = Array.from(new Array(m), () =>
    Array.from(new Array(n), () => new Array(2).fill(0))
  );
  if (matrix[0][0] === "1") dp[0][0] = [1, 1];
  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] > 0) {
        let curDimension = dp[i][j];
        if (i === 0) {
          if (j > 0) {
            curDimension[0] = matrix[i][j - 1] > 0 ? dp[i][j - 1][0] + 1 : 1;
            curDimension[1] = 1;
          }
        } else if (j === 0) {
          if (i > 0) {
            curDimension[0] = 1;
            curDimension[1] = matrix[i - 1][j] > 0 ? dp[i - 1][j][1] + 1 : 1;
          }
        } else {
          curDimension[0] = matrix[i][j - 1] > 0 ? dp[i][j - 1][0] + 1 : 1;
          curDimension[1] = matrix[i - 1][j] > 0 ? dp[i - 1][j][1] + 1 : 1;
        }
        res = Math.max(res, curDimension[0] * curDimension[1]);
      }
    }
  }
  console.log(dp);
  return res;
};
// @lc code=end
