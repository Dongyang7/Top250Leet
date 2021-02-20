/*
 * @lc app=leetcode id=55 lang=javascript
 *
 * [55] Jump Game
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
/**
首先要有这样一个假设：如果数组的最后一位可以被跳到，那么它前面的每一位都可以被跳到，
所以遍历数组，如果某一个位置不能被跳到，那么这个数组肯定就不符合条件
 */
var canJump = function (nums) {
  if (nums.length < 2) return true;
  let rightMost = nums[0];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && rightMost < i) return false;
    else {
      rightMost = Math.max(rightMost, i + nums[i]);
    }
    if (rightMost >= nums.length - 1) return true;
  }
};
// @lc code=end
