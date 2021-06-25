/*
 * @lc app=leetcode id=88 lang=javascript
 *
 * [88] Merge Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let [pos1, pos2, writePos] = [m - 1, n - 1, nums1.length - 1];
  while (writePos >= 0) {
    if (pos2 < 0) break;
    if (pos1 < 0 || nums2[pos2] > nums1[pos1]) {
      nums1[writePos] = nums2[pos2--];
    } else {
      nums1[writePos] = nums1[pos1--];
    }
    writePos--;
  }
};
//pos1 >= 0 && pos2 >= 0
// @lc code=end
