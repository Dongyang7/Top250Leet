/*
 * @lc app=leetcode id=26 lang=javascript
 *
 * [26] Remove Duplicates from Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let idx = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[idx] !== nums[i]) {
      idx += 1;
      nums[idx] = nums[i];
    }
  }
  return idx + 1;
};
// @lc code=end
