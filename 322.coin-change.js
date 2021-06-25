/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(-1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    let smallest = amount + 1;
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i && dp[i - coins[j]] !== -1) {
        smallest = Math.min(smallest, dp[i - coins[j]]);
      }
    }
    if (smallest !== amount + 1) {
      dp[i] = smallest + 1;
    }
  }
  return dp[amount];
};
// return the needed coins
var coinChange = function (coins, amount) {
  const dp = Array.from(new Array(amount + 1), () => [-1, 0]);
  dp[0][0] = 0;
  for (let i = 1; i <= amount; i++) {
    let smallest = amount + 1;
    let newAddedCoin = 0;
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i && dp[i - coins[j]][0] !== -1) {
        if (dp[i - coins[j]][0] < smallest && dp[i - coins[j]][0] !== -1) {
          newAddedCoin = coins[j];
        }
        smallest = Math.min(smallest, dp[i - coins[j]][0]);
      }
    }
    if (smallest !== amount + 1) {
      dp[i] = [smallest + 1, newAddedCoin];
    }
  }
  console.log(dp);
  return dp[amount][0];
};
// @lc code=end
