/*
 * @lc app=leetcode id=123 lang=javascript
 *
 * [123] Best Time to Buy and Sell Stock III
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */

// 对于某一天i来说有两种情况，1是这天没有卖出，所以利润和昨天一致f(i - 1)(k)，另一种是这天卖出了，那么利润就是p(i) - p(m) + f(m)(k - 1)，m是买入的那天，p(m)就是那天的价格，这个m可以是(0, i - 1)中的任意值，所以我们可以遍历所有可能的m来计算一个最大的利润；但按照这个思路写出如下code后发现，最里面那个循环其实有很多的重复计算，要解决这个问题，请跳转到29行
var maxProfit = function (prices) {
  const len = prices.length;
  if (len < 2) return 0;
  const dp = Array.from(new Array(len), () => new Array(3).fill(0));
  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= 2; j++) {
      let max = 0;
      for (let m = 0; m < i; m++) {
        max = Math.max(max, dp[m][j - 1] + prices[i] - prices[m]);
      }
      dp[i][j] = Math.max(dp[i - 1][j], max);
    }
  }
  return dp[len - 1][2];
};
// 或者我们可以仔细观察这个公式，p(i) - p(m) + f(m)(k - 1)，可以发现f(m)(k - 1) - p(m)只有这部分影响到了最大值利润的计算，我们可以在遍历prices的同时，保持一个variable来存储这部分的计算结果，这样能把时间复杂度减少到O(NK)
var maxProfit = function (prices) {
  const len = prices.length;
  if (len < 2) return 0;
  const dp = Array.from(new Array(len), () => new Array(3).fill(0));
  for (let j = 1; j <= 2; j++) {
    let maxDiff = Number.MIN_SAFE_INTEGER;
    for (let i = 1; i < len; i++) {
      maxDiff = Math.max(maxDiff, dp[i - 1][j - 1] - prices[i - 1]);
      dp[i][j] = Math.max(dp[i - 1][j], prices[i] + maxDiff);
    }
  }
  return dp[len - 1][2];
};
// @lc code=end
