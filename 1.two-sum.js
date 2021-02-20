/*
 * @lc app=leetcode id=1 lang=javascript
 *
 * [1] Two Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  var dict = {};
  for (let i = 0; i < nums.length; i++) {
    if (dict[target - nums[i]] !== undefined) {
      return [dict[target - nums[i]], i];
    }
    dict[nums[i]] = i;
  }
};
// @lc code=end
