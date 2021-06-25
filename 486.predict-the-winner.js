/*
 * @lc app=leetcode id=486 lang=javascript
 *
 * [486] Predict the Winner
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 这种只有两个玩家的游戏，通常以某个玩家先达成某种条件而胜利，或者某玩家结束时的总分比另一个玩家多而胜利。这类游戏通常符合这种标准：一个玩家的得分可以通过从另一个玩家积分上面扣除来记录（比如tic tac toe和这道题目）。
var PredictTheWinner = function (nums) {
  const memo = {};
  const dfs = (s, e, playerId) => {
    if (memo[s + "," + e]) return memo[s + "," + e];
    let res;
    if (s === e) res = playerId === 1 ? nums[s] : -nums[s];
    else {
      let removeS = dfs(s + 1, e, -playerId);
      let removeE = dfs(s, e - 1, -playerId);
      res = Math.max(nums[s] - removeS, nums[e] - removeE);
    }
    memo[s + "," + e] = res;
    return res;
  };
  return dfs(0, nums.length - 1, 1) >= 0;
};
// 仔细观察上面的程序，我们会发现当前的计算结果完全取决于两种子情况的结果，我们最多有n^2种计算结果，这符合dp条件。通过这么久的刷题，我发现带有memory的dfs通常可以转换成dp，这样能够节省一些function stack空间。
var PredictTheWinner = function (nums) {
  const dp = Array.from(Array(nums.length), () => Array(nums.length).fill(0));
  for (let s = nums.length - 1; s >= 0; s--) {
    for (let e = s; e <= nums.length - 1; e++) {
      if (s === e) {
        dp[s][e] = nums[s];
      } else {
        dp[s][e] = Math.max(nums[s] - dp[s + 1][e], nums[e] - dp[s][e - 1]);
      }
    }
  }
  return dp[0][nums.length - 1] >= 0;
};
// 如果我们将上面的dp数组可视化，就会发现，每一个位置的数值只取决于cell左边和下面cell上的数值。这种情况我们可以把dp缩小成一维数组。
var PredictTheWinner = function (nums) {
  const dp = Array(nums.length);
  for (let s = nums.length - 1; s >= 0; s--) {
    for (let e = s; e <= nums.length - 1; e++) {
      if (s === e) {
        dp[s] = nums[s];
      } else {
        dp[e] = Math.max(nums[s] - dp[e], nums[e] - dp[e - 1]);
      }
    }
  }
  return dp[nums.length - 1] >= 0;
};
// @lc code=end
