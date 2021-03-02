/*
 * @lc app=leetcode id=122 lang=javascript
 *
 * [122] Best Time to Buy and Sell Stock II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices == undefined || prices.length < 2) return 0;
  let maxGain = 0;
  for (let i = 1; i < prices.length; i++) {
    maxGain += Math.max(prices[i] - prices[i - 1], 0);
  }
  return maxGain;
};
// @lc code=end
