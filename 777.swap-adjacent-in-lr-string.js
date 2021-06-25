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
var canTransform = function (start, end) {
  let used = new Set();
  for (let i = 0; i < start.length; i++) {
    if (start[i] !== end[i]) {
      if (start[i] === "R") {
        if (
          end[i] === "X" &&
          i + 1 < start.length &&
          end[i + 1] === "R" &&
          start[i + 1] === "X"
        ) {
          used.add([i, i + 1]);
          i++;
          continue;
        }
        return false;
      }
      if (start[i] === "L") {
        if (
          end[i] === "X" &&
          i - 1 >= 0 &&
          !used.has(i - 1) &&
          end[i - 1] === "L" &&
          start[i - 1] === "X"
        ) {
          used.add([i - 1, i]);
          continue;
        }
        return false;
      }
      if (start[i] === "X") {
        if (
          end[i] === "R" ||
          (end[i] === "L" && start[i + 1] !== "L") ||
          end[i + 1] !== "X"
        )
          return false;
      }
    }
  }
  return true;
};
// @lc code=end
