/*
 * @lc app=leetcode id=239 lang=javascript
 *
 * [239] Sliding Window Maximum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  let i = 0;
  let [deque, res] = [[], []];
  while (i < nums.length) {
    if (deque.length > 0) {
      if (deque[0] < i - k + 1) {
        deque.shift();
      }
      while (nums[deque[deque.length - 1]] < nums[i]) {
        deque.pop();
      }
    }
    deque.push(i);
    if (i - k + 1 >= 0) res[i - k + 1] = deque[0];
    i++;
  }
  return res;
};
// @lc code=end
