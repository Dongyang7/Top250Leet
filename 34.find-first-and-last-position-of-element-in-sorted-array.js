/*
 * @lc app=leetcode id=34 lang=javascript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let len = nums.length;
  const helper = (curTarget) => {
    if (len === 0 || curTarget < nums[0] || curTarget > nums[len - 1])
      return [-1, -1];
    let [start, end] = [0, len - 1];
    while (start + 1 < end) {
      let mid = Math.floor((start + end) / 2);
      if (nums[mid] < curTarget) {
        // this makes sure first occurance of target is inside range [start, end] inclusively.
        start = mid;
      } else {
        end = mid;
      }
    }
    return [start, end];
  };
  let res = [];
  let [start1, start2] = helper(target);
  if (nums[start1] === target) res.push(start1);
  else if (nums[start2] === target) res.push(start2);
  else return [-1, -1];
  let [end1, end2] = helper(target + 1);
  if (nums[end1] === target) res.push(end1);
  else if (nums[end1 - 1] === target) res.push(end1 - 1);
  else res.push(len - 1);
  return res;
};
// @lc code=end
