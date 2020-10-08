/*
 * @lc app=leetcode id=27 lang=javascript
 *
 * [27] Remove Element
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let idx = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== val) {
      nums[idx] = nums[i];
      idx += 1;
    }
  }
  return idx;
};
// @lc code=end
