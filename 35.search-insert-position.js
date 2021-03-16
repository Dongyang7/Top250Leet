/*
 * @lc app=leetcode id=35 lang=javascript
 *
 * [35] Search Insert Position
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let [start, end] = [0, nums.length - 1];
  while (start + 1 < end) {
    let mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      start = mid;
    } else {
      end = mid;
    }
  }
  if (target <= nums[start]) return start;
  else if (target > nums[end]) return end + 1;
  else return end;
};
// @lc code=end
