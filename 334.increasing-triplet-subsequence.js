/*
 * @lc app=leetcode id=334 lang=javascript
 *
 * [334] Increasing Triplet Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

// first version, very redundent
var increasingTriplet = function (nums) {
  if (!nums.length || nums.length < 3) return false;
  let len = nums.length;
  for (let i = 0; i < len - 2; i++) {
    if (i > 0 && nums[i] >= nums[i - 1]) continue;
    for (let j = i + 1; j < len - 1; j++) {
      if (nums[j] <= nums[i]) {
        continue;
      } else {
        for (let m = j + 1; m < len; m++) {
          if (nums[m] > nums[j]) return true;
          else {
            continue;
          }
        }
      }
    }
  }
  return false;
};
/*这让我想一年也不一定想的出来吧，但其实很好理解，我们需要维护两个单调递增的点，这样只要有一个点大于他俩，就说明true。如果题目问的是三个点的位置，那么就需要每次替换最小的first时把当前first赋值给second */
var increasingTriplet = function (nums) {
  if (!nums.length || nums.length < 3) return false;
  let [first, second] = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= first) first = nums[i];
    else if (nums[i] <= second) second = nums[i];
    else return true;
  }
  return false;
};
// @lc code=end
