/*
 * @lc app=leetcode id=213 lang=javascript
 *
 * [213] House Robber II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const dp = Array.from(new Array(nums.length + 2), () => [-1, -1]);
  const dfs = (idx, willRobLast) => {
    if (idx >= nums.length) return 0;
    // if (dp[idx][willRobLast ? 0 : 1] >= 0) return dp[idx][willRobLast ? 0 : 1];
    let curMax;
    if (idx === nums.length - 1) {
      curMax = willRobLast ? nums[nums.length - 1] : 0;
    } else if (idx === 0 && willRobLast) {
      curMax = dfs(1, willRobLast);
    } else {
      curMax = Math.max(
        dp[idx + 1][willRobLast ? 0 : 1] >= 0
          ? dp[idx + 1][willRobLast ? 0 : 1]
          : dfs(idx + 1, willRobLast),
        (dp[idx + 2][willRobLast ? 0 : 1] >= 0
          ? dp[idx + 2][willRobLast ? 0 : 1]
          : dfs(idx + 2, willRobLast)) + nums[idx]
      );
      //   curMax = Math.max(
      //     dfs(idx + 1, willRobLast),
      //     dfs(idx + 2, willRobLast) + nums[idx]
      //   );
    }
    dp[idx][willRobLast ? 0 : 1] = curMax;
    return curMax;
  };
  let res = Math.max(dfs(0, true), dfs(0, false));
  return res;
};
// @lc code=end
