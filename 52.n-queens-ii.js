/*
 * @lc app=leetcode id=52 lang=javascript
 *
 * [52] N-Queens II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  let res = 0;
  const backtrack = (row, colSet, diagSet, antiDiagSet) => {
    for (let col = 0; col < n; col++) {
      if (
        !(
          colSet.has(col) ||
          diagSet.has(row - col) ||
          antiDiagSet.has(row + col)
        )
      ) {
        colSet.add(col);
        diagSet.add(row - col);
        antiDiagSet.add(row + col);
        if (row === n - 1) {
          res++;
        } else backtrack(row + 1, colSet, diagSet, antiDiagSet);
        colSet.delete(col);
        diagSet.delete(row - col);
        antiDiagSet.delete(row + col);
      }
    }
  };
  backtrack(0, new Set(), new Set(), new Set());
  return res;
};
// @lc code=end
