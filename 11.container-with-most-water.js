/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // 2 pointers
  let res = 0;
  let [left, right] = [0, height.length - 1];
  while (left < right) {
    res = Math.max((right - left) * Math.min(height[right], height[left]), res);
    if (height[left] > height[right]) {
      right--;
    } else if (height[left] === height[right]) {
      left++;
      right--;
    } else {
      left++;
    }
  }
  return res;
};
// @lc code=end
