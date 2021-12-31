/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  var res = [];
  const backtrack = (curArr, numPar1, par12Diff) => {
    if (curArr.length === 2 * n) {
      res.push(curArr.join(""));
    } else {
      if (numPar1 < n) {
        curArr.push("(");
        backtrack(curArr, numPar1 + 1, par12Diff + 1);
        curArr.pop();
      }
      if (par12Diff > 0) {
        curArr.push(")");
        backtrack(curArr, numPar1, par12Diff - 1);
        curArr.pop();
      }
    }
  };
  backtrack(["("], 1, 1);
  return res;
};
// @lc code=end
