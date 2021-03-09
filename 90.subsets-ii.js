/*
 * @lc app=leetcode id=90 lang=javascript
 *
 * [90] Subsets II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  if (!nums) return [];
  let res = [];
  if (nums.length === 0) return res;
  nums.sort();
  const helper = (startIndex, startSubset) => {
    // doing a deep copy here
    res.push([...startSubset]);
    let previousVal;
    // previousVal表示同一层（同一个recursion）里面，前一个值是多少
    for (let i = startIndex; i < nums.length; i++) {
      if (nums[i] === previousVal) continue;
      startSubset.push(nums[i]);
      previousVal = nums[i];
      helper(i + 1, startSubset);
      startSubset.pop();
    }
  };
  helper(0, []);
  return res;
};

var subsetsWithDup = function (nums) {
  if (!nums) return [];
  let res = [];
  if (nums.length === 0) return res;
  nums.sort();
  const helper = (startIndex, startSubset) => {
    // doing a deep copy here
    res.push([...startSubset]);
    for (let i = startIndex; i < nums.length; i++) {
      //其实不用previousVal来保存起来，只要i大于startIndex，就说明是在同一层recursion上面做比较
      if (i > startIndex && nums[i] === nums[i - 1]) continue;
      startSubset.push(nums[i]);
      helper(i + 1, startSubset);
      startSubset.pop();
    }
  };
  helper(0, []);
  return res;
};
// @lc code=end
