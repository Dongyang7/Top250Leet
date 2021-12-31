/*
 * @lc app=leetcode id=167 lang=javascript
 *
 * [167] Two Sum II - Input array is sorted
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let [start, end] = [0, numbers.length - 1];
  while (start < end) {
    if (numbers[start] + numbers[end] > target) {
      end--;
    } else if (numbers[start] + numbers[end] < target) {
      start++;
    } else {
      return [start, end];
    }
  }
};
// @lc code=end
