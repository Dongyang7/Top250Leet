/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// O(n^2) time complexity, sort first, 然后从第一位开始，对剩下的部分用二分法2sum找target
var threeSum = function (nums) {
  let [visited, res] = [{}, []];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break;
    if (!visited[nums[i]]) {
      visited[nums[i]] = true;
      let [start, end, target] = [i + 1, nums.length - 1, -nums[i]];
      while (start < end) {
        if (nums[start] + nums[end] > target) {
          end--;
        } else if (nums[start] + nums[end] < target) {
          start++;
        } else {
          res.push([nums[start++], nums[end--], -target]);
          while (start < end && nums[start] === nums[start - 1]) {
            start++;
          }
        }
      }
    }
  }
  return res;
};
// @lc code=end
