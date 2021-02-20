/*
 * @lc app=leetcode id=45 lang=javascript
 *
 * [45] Jump Game II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  var res = nums.length - 1;
  var bucket = new Array(nums.length);
  bucket[0] = 0;
  bucket[1] = 1;
  const helper = (len) => {
    console.log(len, bucket);
    if (len === 1) return 0;
    if (len === 2) return 1;
    for (let i = 0; i < len; i++) {
      if (nums[i] >= len - 1 - i) {
        if (bucket[i + 1]) {
          res = Math.min(res, bucket[i + 1] + 1);
        } else {
          res = Math.min(res, helper(i + 1) + 1);
        }
      }
    }
    bucket[len] = res;
    return res;
  };
  return helper(nums.length);
};
// @lc code=end

// 4,1,2,1,4
