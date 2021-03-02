/*
 * @lc app=leetcode id=121 lang=javascript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
/*其实不用extra arr应该也可以，但我的思路把我固定住了，我的想法是先生成一个kArr，差值数组，这样能够清晰地判断哪里是dip，从而确定买入的时机；*/
// 我擦，原来我想出来的这个是Kadane算法，这都行。。。
var maxProfit = function (prices) {
  if (prices.length < 2) return 0;
  let kArr = new Array(prices.length).fill(0);
  for (let i = 1; i < prices.length; i++) {
    kArr[i] = prices[i] - prices[i - 1];
  }
  let [accumulation, maxGain] = [0, 0];
  for (let j = 0; j < kArr.length; j++) {
    if (accumulation === 0) {
      if (kArr[j] > 0) {
        maxGain = Math.max(maxGain, kArr[j]);
        accumulation = kArr[j];
      } else {
        continue;
      }
    } else {
      accumulation += kArr[j];
      maxGain = Math.max(maxGain, accumulation);
      if (accumulation < 0) {
        accumulation = 0;
      } else {
        continue;
      }
    }
  }
  return maxGain;
};
//思路还是被限制了，看了眼九章的题解，完全不用这么复杂
var maxProfit = function (prices) {
  if (prices == undefined || prices.length < 2) return 0;
  let minPrice = Number.MAX_SAFE_INTEGER;
  let maxGain = 0;
  for (let i = 0; i < prices.length; i++) {
    minPrice = Math.min(prices[i], minPrice);
    maxGain = Math.max(prices[i] - minPrice, maxGain);
  }
  return maxGain;
};
// @lc code=end
