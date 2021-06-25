/*
 * @lc app=leetcode id=220 lang=javascript
 *
 * [220] Contains Duplicate III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
// Set.prototype.min = Number.MAX_SAFE_INTEGER
// Set.prototype.max = Number.MIN_SAFE_INTEGER
// Set.prototype.myAdd = function(value) {
//     this.add(value)
//     this.
// }
var containsNearbyAlmostDuplicate = function (nums, k, t) {
  const idxSet = new Set();
  for (let i = 0; i < nums.length; i++) {
    let curNum = nums[i];
    for (let j = curNum - t; j <= curNum + t; j++) {
      if (idxSet.has(j)) return true;
    }
    idxSet.add(curNum);
    if (idxSet.size > k) idxSet.delete(nums[i - k]);
  }
  return false;
};
// @lc code=end
