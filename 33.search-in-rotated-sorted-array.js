/*
 * @lc app=leetcode id=33 lang=javascript
 *
 * [33] Search in Rotated Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 利用递归，不用找到rotation位置，空间和时间复杂度都是LogN
var search = function (nums, target) {
  const helper = (start, end) => {
    if (start + 1 >= end) {
      if (nums[start] === target) return start;
      else if (nums[end] === target) return end;
      else return -1;
    }
    let mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === target) return mid;
    if (nums[start] < nums[mid]) {
      if (target >= nums[start] && target <= nums[mid]) {
        end = mid;
      } else return helper(mid, end);
    } else {
      if (target >= nums[mid] && target <= nums[end]) {
        start = mid;
      } else return helper(start, mid);
    }
    while (start + 1 < end) {
      mid = start + Math.floor((end - start) / 2);
      if (nums[mid] === target) return mid;
      else if (target > nums[mid]) {
        start = mid;
      } else {
        end = mid;
      }
    }
    return helper(start, end);
  };
  return helper(0, nums.length - 1);
};
// 利用二分法找rotation位置，然后再用二分法找target，时间LogN，空间constant
var search = function (nums, target) {
  let len = nums.length;
  if (len < 1) return -1;
  let [start, end] = [0, len - 1];
  while (start + 1 < end) {
    let mid = start + Math.floor((end - start) / 2);
    if (nums[mid] < nums[end]) end = mid;
    else start = mid;
  }
  const rotationPoint = nums[start] > nums[end] ? end : start;
  start = rotationPoint;
  end = rotationPoint + len - 1;
  while (start + 1 < end) {
    let mid = start + Math.floor((end - start) / 2);
    if (nums[mid % len] === target) return mid % len;
    if (nums[mid % len] > target) end = mid;
    else start = mid;
  }
  if (nums[start % len] === target) return start % len;
  else if (nums[end % len] === target) return end % len;
  else return -1;
};
// @lc code=end
