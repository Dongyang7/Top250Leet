/*
 * @lc app=leetcode id=1423 lang=javascript
 *
 * [1423] Maximum Points You Can Obtain from Cards
 */

// @lc code=start
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
  let len = cardPoints.length;
  if (k >= len) return cardPoints.reduce((acc, cur) => acc + cur, 0);
  let [leftSum, rightSum] = [0, 0];
  for (let i = len - k; i < len; i++) {
    // use iteration to calculate the rightsum, so there's no extra space cost (instead of using slice and reduce)
    rightSum += cardPoints[i];
  }
  let res = leftSum + rightSum;
  for (let i = 1; i <= k; i++) {
    leftSum += cardPoints[i - 1];
    rightSum -= cardPoints[len - k + i - 1];
    res = Math.max(res, leftSum + rightSum);
  }
  return res;
};
// @lc code=end
