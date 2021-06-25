/*
 * @lc app=leetcode id=1029 lang=javascript
 *
 * [1029] Two City Scheduling
 */

// @lc code=start
/**
 * @param {number[][]} costs
 * @return {number}
 */
//brute force recursion
var twoCitySchedCost = function (costs) {
  const n = costs.length / 2;
  const helper = (start, aCount, bCount) => {
    if (start === 2 * n - 1)
      return aCount === n ? costs[2 * n - 1][1] : costs[2 * n - 1][0];
    if (aCount === n) return costs[start][1] + helper(start + 1, n, bCount + 1);
    if (bCount === n) return costs[start][0] + helper(start + 1, aCount + 1, n);
    return Math.min(
      costs[start][0] + helper(start + 1, aCount + 1, bCount),
      costs[start][1] + helper(start + 1, aCount, bCount + 1)
    );
  };
  return helper(0, 0, 0);
};
// with memorization, O(N^2)
var twoCitySchedCost = function (costs) {
  const n = costs.length / 2;
  const hash = {};
  const helper = (start, aCount, bCount) => {
    if (start === 2 * n - 1)
      return aCount === n ? costs[2 * n - 1][1] : costs[2 * n - 1][0];
    if (aCount === n) return costs[start][1] + helper(start + 1, n, bCount + 1);
    if (bCount === n) return costs[start][0] + helper(start + 1, aCount + 1, n);
    let res = Math.min(
      hash[start + 1 + "" + (aCount + 1) + bCount]
        ? hash[start + 1 + "" + (aCount + 1) + bCount] + costs[start][0]
        : costs[start][0] + helper(start + 1, aCount + 1, bCount),
      hash[start + 1 + "" + aCount + (bCount + 1)]
        ? hash[start + 1 + "" + aCount + (bCount + 1)] + costs[start][1]
        : costs[start][1] + helper(start + 1, aCount, bCount + 1)
    );
    hash[start + "" + aCount + bCount] = res;
    return res;
  };
  return helper(0, 0, 0);
};
// greedy, 贪心算法一般需要sort一个array，本题中，aCost - bCost represents the amount of money company can save if send the guy to city B comparing to A(it can be negative), 所以我们可以对这个值进行排序，选取能够save最多的前n个送到B，另外n个送到A
var twoCitySchedCost = function (costs) {
  const n = costs.length / 2;
  costs.sort((i, j) => j[0] - j[1] - (i[0] - i[1]));
  let res = 0;
  for (let m = 0; m < n; m++) {
    res += costs[m][1] + costs[2 * n - 1 - m][0];
  }
  return res;
};
// @lc code=end
