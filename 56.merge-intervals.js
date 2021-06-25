/*
 * @lc app=leetcode id=56 lang=javascript
 *
 * [56] Merge Intervals
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  let sortedArr = intervals.sort((a, b) => a[0] - b[0]);
  let [resArr, n] = [[], sortedArr.length];
  for (let i = 0; i < n; i++) {
    let [curStart, curEnd] = sortedArr[i]; // 用这两个变量分别代表merge后的区间的起始和结束，只要下一个interval的起始小于merge后区间的结束，我们就merge进来。
    while (i + 1 < n && sortedArr[i + 1][0] <= curEnd) {
      curEnd = Math.max(curEnd, sortedArr[i + 1][1]);
      i++;
    }
    resArr.push([curStart, curEnd]);
  }
  return resArr;
};
// @lc code=end
