/*
 * @lc app=leetcode id=238 lang=javascript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 刚看到题目要求没啥头绪，但既然又要On又不要除法，我就猜可能需要额外空间。同时我在草稿纸上面举了个例子，发现位置i的结果其实需要i前后两段subarray的乘积再相乘。所以想到可以用两个arr分别存储这两个subarray在某位置的乘积。
var productExceptSelf = function (nums) {
  let [i, forwardAcc, backwardAcc, answer] = [
    0,
    Array(nums.length),
    Array(nums.length),
    Array(nums.length),
  ];
  while (i < nums.length) {
    forwardAcc[i] = nums[i] * (i - 1 >= 0 ? forwardAcc[i - 1] : 1);
    i++;
  }
  i = nums.length - 1;
  while (i >= 0) {
    backwardAcc[i] = nums[i] * (i + 1 < nums.length ? backwardAcc[i + 1] : 1);
    answer[i] =
      (i - 1 >= 0 ? forwardAcc[i - 1] : 1) * // forwardAcc完全可以存到answer里面
      (i + 1 < nums.length ? backwardAcc[i + 1] : 1); // 永远只需要backwardAcc在i+1位置的数字，而这个数字又是一步步累撑得到的，所以可以用一个variable取代。
    i--;
  }
  return answer;
};
// 看了讨论区发现竟然还可以不用额外空间。仔细观察我的代码后发现，forwardAcc完全是多余的，存到answer里面就是了，甚至backwardAcc也是可以用变量取代。
var productExceptSelf = function (nums) {
  let [i, answer] = [0, Array(nums.length)];
  while (i < nums.length) {
    answer[i] = nums[i] * (i - 1 >= 0 ? answer[i - 1] : 1);
    i++;
  }
  i = nums.length - 1;
  let backwardAcc = 1;
  while (i >= 0) {
    answer[i] = (i - 1 >= 0 ? answer[i - 1] : 1) * backwardAcc;
    backwardAcc *= nums[i];
    i--;
  }
  return answer;
};
// @lc code=end
