/*
 * @lc app=leetcode id=57 lang=javascript
 *
 * [57] Insert Interval
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][0] > newInterval[1]) {
      intervals.splice(i, 0, newInterval);
      break;
    } else if (
      newInterval[1] <= intervals[i][1] &&
      newInterval[0] <= intervals[i][0]
    ) {
      intervals.splice(i, 1, [newInterval[0], intervals[i][1]]);
      break;
    } else if (
      newInterval[0] > intervals[i][0] &&
      newInterval[1] < intervals[i][1]
    ) {
      break;
    } else if (
      newInterval[0] <= intervals[i][1] &&
      newInterval[0] >= intervals[i][0] &&
      newInterval[1] >= intervals[i][1]
    ) {
      intervals.splice(i, 1, [intervals[i][0], newInterval[1]]);
      break;
    } else if (newInterval[0] > intervals[i][1]) {
      if (i === intervals.length - 1) {
        intervals.push(newInterval);
        break;
      } else {
        continue;
      }
    } else break;
  }
  return intervals;
};
// 最开始想直接遍历的同时就改了，但发现不太能handle新区间覆盖很多个老区间的情况，所以我们先遍历一遍来找到新区间的边界与旧区间数组的关系，之后直接用一个splice解决问题
var insert = function (intervals, newInterval) {
  let memo = new Array(4).fill(-1);
  let element;
  for (let index = 0; index < intervals.length; index++) {
    element = intervals[index];
    if (memo[0] < 0) {
      if (element[0] >= newInterval[0]) {
        memo[0] = index;
        memo[1] = 0;
      } else if (element[1] >= newInterval[0]) {
        memo[0] = index;
        memo[1] = 1;
      }
    }
    if (memo[2] < 0) {
      if (element[0] > newInterval[1]) {
        memo[2] = index;
        memo[3] = 0;
      } else if (element[1] >= newInterval[1]) {
        memo[2] = index;
        memo[3] = 1;
      }
    }
  }
  if (memo[0] < 0) {
    memo = [intervals.length, 0, intervals.length, 0];
  }
  if (memo[2] < 0) {
    memo[2] = intervals.length;
    memo[3] = 0;
  }
  intervals.splice(memo[0], memo[2] - memo[0] + memo[3], [
    memo[1] === 0 ? newInterval[0] : intervals[memo[0]][0],
    memo[3] === 0 ? newInterval[1] : intervals[memo[2]][1],
  ]);
  return intervals;
};
// @lc code=end
