/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let [leftMax, rightMax, i] = [[], [], 0];
  while (i < height.length) {
    leftMax.push(Math.max(leftMax[i - 1] || height[i], height[i]));
    i++;
  }
  i--;
  while (i >= 0) {
    rightMax[i] = Math.max(rightMax[i + 1] || height[i], height[i]);
    i--;
  }
  i = 0;
  let res = 0;
  while (i < height.length) {
    res += Math.min(leftMax[i], rightMax[i]) - height[i];
    i++;
  }
  return res;
};
// @lc code=end
