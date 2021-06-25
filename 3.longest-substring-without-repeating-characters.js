/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// 2 pointer并不代表就不需要别的存储空间了，像这道题，就用到了一个map来记录end上的char是否重复
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0 || s.length === 1) return s.length;
  const lastPos = {};
  let [start, end] = [0, 0];
  let res = 0;
  while (end < s.length) {
    let sEnd = s[end];
    if (lastPos[sEnd] !== undefined && lastPos[sEnd] >= start) {
      start = lastPos[sEnd] + 1;
      lastPos[sEnd] = end;
    } else {
      lastPos[sEnd] = end;
      res = Math.max(res, end - start + 1);
    }
    end++;
  }
  return res;
};
// @lc code=end
