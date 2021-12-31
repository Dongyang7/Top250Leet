/*
 * @lc app=leetcode id=777 lang=javascript
 *
 * [777] Swap Adjacent in LR String
 */

// @lc code=start
/**
 * @param {string} start
 * @param {string} end
 * @return {boolean}
 */
// 这种找规律的题。。。被踩的多很正常。。。
var canTransform = function (start, end) {
  let idx1 = (idx2 = 0);
  if (start.length !== end.length) return false;
  while (idx1 < start.length || idx2 < start.length) {
    if (idx1 === start.length) {
      if (end[idx2] !== "X") return false;
      idx2++;
    } else if (idx2 === start.length) {
      if (start[idx1] !== "X") return false;
      idx1++;
    } else if (start[idx1] === "R") {
      if (end[idx2] === "R") {
        if (idx1 > idx2) return false;
        idx1++;
        idx2++;
      } else if (end[idx2] === "L") return false;
      else idx2++;
    } else if (start[idx1] === "L") {
      if (end[idx2] === "L") {
        if (idx1 < idx2) return false;
        idx1++;
        idx2++;
      } else if (end[idx2] === "R") return false;
      else idx2++;
    } else {
      if (start[idx1] === "X") {
        idx1++;
      }
      if (end[idx2] === "X") {
        idx2++;
      }
    }
  }
  return true;
};
// @lc code=end
