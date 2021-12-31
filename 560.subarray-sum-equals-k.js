/*
 * @lc app=leetcode id=560 lang=javascript
 *
 * [560] Subarray Sum Equals K
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 首先我预先知道这道题要用prefix来解，所以先生成了一个prefixArr；我们问题的解就变成了prefixArr里面有几个pair的差值是k。这个问题就可以用一个hashmap仅仅过一遍来解决：map里面存放着比当前数字大k的数字，value就是当前数字目前为止出现的频率，当我们后面遇到一个数字等于map里面的key，就把value里面的频率加到结果里。要注意prefixArr的第一项是0，是我们的base，如果没有这一项，result可能会少1。
var subarraySum = function (nums, k) {
  if (nums.length < 1) return -1;
  const prefixArr = [0, ...nums];
  const sumMap = { [k]: 1 };
  let res = 0;
  for (let i = 1; i <= nums.length; i++) {
    prefixArr[i] += prefixArr[i - 1];
    res += sumMap[prefixArr[i]] || 0;
    sumMap[prefixArr[i] + k] = (sumMap[prefixArr[i] + k] || 0) + 1;
  }
  return res;
};
// 仔细想想看，prefixArr甚至都不需要，因为我们从来没有用过i - 1和i这两个位置以外的数字，所以只需要用两个(一个)变量保存这两个位置的数值即可.
var subarraySum = function (nums, k) {
  if (nums.length < 1) return -1;
  const sumMap = { [k]: 1 };
  let [res, curSum] = [0, 0];
  for (let i = 0; i < nums.length; i++) {
    curSum += nums[i];
    res += sumMap[curSum] || 0;
    sumMap[curSum + k] = (sumMap[curSum + k] || 0) + 1;
  }
  return res;
};
// @lc code=end
