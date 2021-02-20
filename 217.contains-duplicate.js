/*
 * @lc app=leetcode id=217 lang=javascript
 *
 * [217] Contains Duplicate
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const bucket = {};
  for (let i = 0; i < nums.length; i++) {
    if (bucket[nums[i]] !== undefined) {
      return true;
    } else {
      bucket[nums[i]] = i;
    }
  }
  return false;
};
// @lc code=end
