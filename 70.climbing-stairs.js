/*
 * @lc app=leetcode id=70 lang=javascript
 *
 * [70] Climbing Stairs
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (!n || n < 0) return 0;
  if (n < 3) return n;
  let [waysNum, prevWaysNum, prevprevWaysNum] = [0, 2, 1];
  for (let i = 2; i < n; i++) {
    waysNum = prevWaysNum + prevprevWaysNum;
    prevprevWaysNum = prevWaysNum;
    prevWaysNum = waysNum;
  }
  return waysNum;
};
// @lc code=end
