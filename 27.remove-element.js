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
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[slow] === val) {
      if (nums[fast] !== val) {
        let tmp = nums[slow];
        nums[slow] = nums[fast];
        nums[fast] = tmp;
        slow++;
      }
      continue;
    }
    slow++;
  }
  return slow;
};
// @lc code=end
