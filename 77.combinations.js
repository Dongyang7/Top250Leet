/*
 * @lc app=leetcode id=77 lang=javascript
 *
 * [77] Combinations
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  let res = [];
  const backtrack = (idx, remainK, curArr) => {
    if (remainK === 0) {
      res.push([...curArr]);
    } else {
      for (let i = idx + 1; i <= n - remainK + 1; i++) {
        curArr.push(i);
        backtrack(i, remainK - 1, curArr);
        curArr.pop();
      }
    }
  };
  backtrack(0, k, []);
  return res;
};
// @lc code=end
