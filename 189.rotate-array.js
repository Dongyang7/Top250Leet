/*
 * @lc app=leetcode id=189 lang=javascript
 *
 * [189] Rotate Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/*这种问题能怎么想？看了hint也不会啊，画一画找规律？*/
var rotate = function (nums, k) {
  var reverse = function (start, end) {
    for (let i = start; i < (end + start) / 2; i++) {
      let tmp = nums[i];
      nums[i] = nums[end + start - i];
      nums[end + start - i] = tmp;
    }
  };
  k = k % nums.length;
  if (k == 0) return;
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
};
// @lc code=end
