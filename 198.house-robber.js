/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const dp = new Array(nums.length);
  const dfs = (idx) => {
    if (idx >= nums.length) return 0;
    // if (dp[idx] !== undefined) return dp[idx];
    let curMax = Math.max(
      (dp[idx + 2] === undefined ? dfs(idx + 2) : dp[idx + 2]) + nums[idx],
      dp[idx + 1] === undefined ? dfs(idx + 1) : dp[idx + 1]
    );
    dp[idx] = curMax;
    return curMax;
  };
  return dfs(0);
};
// 仔细观察上面的dfs核心部分，不难发现，当前的f(n) only relies on f(n+1) and f(n+2), 这种情况我们是可以构建dp的，因此我们可以从n最大时开始构建dp，只需保存这两个结果就行。
var rob = function (nums) {
  let robNextNext = 0;
  let robNext = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i--) {
    let curMax = Math.max(robNext, nums[i] + robNextNext);
    robNextNext = robNext;
    robNext = curMax;
  }
  return robNext;
};
// @lc code=end
