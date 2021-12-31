/*
 * @lc app=leetcode id=464 lang=javascript
 *
 * [464] Can I Win
 */

// @lc code=start
/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
// 其实就是个bruteforce，对debtarr，从idx0开始，遇到一个与当前num符号相反的数字，我们就把当前数字加到那个位置上，这样第一个位置就相当于是被那个位置配平了；然后我们挪到下一个idx1处，用当前的debtarr，step加一；时间复杂度是O(N!)
// https://leetcode.com/problems/optimal-account-balancing/discuss/130895/Recursion-Logical-Thinking
var minTransfers = function (transactions) {
  let debtMap = {};
  for (let [from, to, amount] of transactions) {
    debtMap[from] = (debtMap[from] || 0) - amount;
    debtMap[to] = (debtMap[to] || 0) + amount;
  }
  //   console.log(debtMap);
  let debtArr = Object.keys(debtMap)
    .map((key) => debtMap[key])
    .filter((item) => item !== 0);
  console.log(debtArr);
  let res = Number.MAX_SAFE_INTEGER;
  const backtrack = (idx, step) => {
    // console.log('???', idx, step, debtArr)
    while (debtArr[idx] === 0 && idx < debtArr.length) idx++;
    if (idx >= debtArr.length - 1) {
      res = Math.min(res, step);
    } else {
      for (let i = idx + 1; i < debtArr.length; i++) {
        if (debtArr[i] * debtArr[idx] < 0) {
          debtArr[i] += debtArr[idx];
          backtrack(idx + 1, step + 1);
          debtArr[i] -= debtArr[idx];
        }
      }
    }
  };
  if (debtArr.length === 0) return 0;
  backtrack(0, 0);
  return res;
};
// @lc code=end
