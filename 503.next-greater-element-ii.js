/*
 * @lc app=leetcode id=503 lang=javascript
 *
 * [503] Next Greater Element II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// stack with normal single array
var nextGreaterElements = function (nums) {
  const stack = [];
  let n = nums.length;
  const res = new Array(n).fill(-1);
  for (let i = n - 1; i >= 0; i--) {
    while (nums[i] >= nums[stack[stack.length - 1]] && stack.length > 0) {
      stack.pop();
    }
    if (stack.length === 0) {
      res[i] = -1;
    } else {
      res[i] = nums[stack[stack.length - 1]];
    }
    stack.push(i);
  }
  return res;
};
// stack with double array
var nextGreaterElements = function (nums) {
  const stack = [];
  let n = nums.length;
  const res = new Array(n).fill(-1);
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (nums[i % n] >= nums[stack[stack.length - 1]] && stack.length > 0) {
      stack.pop();
    }
    if (stack.length === 0) {
      res[i % n] = -1;
    } else {
      res[i % n] = nums[stack[stack.length - 1]];
    }
    stack.push(i % n);
  }
  return res;
};
// @lc code=end
