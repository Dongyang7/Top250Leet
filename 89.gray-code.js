/*
 * @lc app=leetcode id=89 lang=javascript
 *
 * [89] Gray Code
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let res = Array(Math.pow(2, n));
  res[0] = 0;
  let [lastPosSet, numSet] = [
    Set(Array.from(Array(n), (ele, idx) => Math.pow(2, idx))),
    Set(),
  ];
  const backtrack = (idx) => {
    if (idx === res.length - 1) {
      res[idx] = [...lastPosSet][0];
    }
    let lastNum = (res[idx - 1] >>> 0).toString(2);
  };
  backtrack(1);
  return res;
};
// @lc code=end
