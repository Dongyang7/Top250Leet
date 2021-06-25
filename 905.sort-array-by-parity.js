/*
 * @lc app=leetcode id=905 lang=javascript
 *
 * [905] Sort Array By Parity
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  let slow = (fast = 0);
  while (fast <= nums.length - 1) {
    if (nums[slow] % 2 === 1) {
      if (nums[fast] % 2 === 0) {
        [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
        slow++;
      }
      fast++;
    } else {
      slow++;
      fast++;
    }
  }
  return nums;
};
sortArrayByParity([3, 1, 2, 4]);
// @lc code=end
