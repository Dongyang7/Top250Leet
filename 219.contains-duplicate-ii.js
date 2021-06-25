/*
 * @lc app=leetcode id=219 lang=javascript
 *
 * [219] Contains Duplicate II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const closestIdx = new Map();
  for (let i = 0; i < nums.length; i++) {
    let curNum = nums[i];
    if (closestIdx.has(curNum) && i - closestIdx.get(curNum) <= k) {
      return true;
    } else {
      closestIdx.set(curNum, i);
    }
  }
  return false;
};

//可以进行空间优化，因为坐标位置i-k之前的记录都没有意义了，可以删掉
var containsNearbyDuplicate = function (nums, k) {
  const idxSet = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (idxSet.has(nums[i])) return true;
    else {
      idxSet.add(nums[i]);
      if (idxSet.size > k) {
        idxSet.delete(nums[i - k]);
      }
    }
  }
  return false;
};
// @lc code=end
