/*
 * @lc app=leetcode id=283 lang=javascript
 *
 * [283] Move Zeroes
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let slow = (fast = 0);
  while (fast < nums.length) {
    if (nums[slow] === 0) {
      if (nums[fast] !== 0) {
        [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
        fast++;
        slow++;
      } else {
        fast++;
      }
    } else {
      fast++;
      slow++;
    }
  }
};
// @lc code=end
