/*
 * @lc app=leetcode id=388 lang=javascript
 *
 * [388] Longest Absolute File Path
 */

// @lc code=start
/**
 * @param {string} input
 * @return {number}
 */
var lengthLongestPath = function (input) {
  const fileDots = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === ".") {
      fileDots.push(i);
    }
  }
  let res = 0;
  for (let i = 0; i < fileDots.length; i++) {
    let curPathLen = 0;
    let curFileDepth = 0;
    let fileTabPos = input.slice(fileDots[i]).lastIndexOf("\\t");
    if (fileTabPos !== -1) {
      curPathLen += fileDots[i] - 2 - fileTabPos;
      while (input[fileTabPos - 1] === "t" && input[fileTabPos - 2] === "\\") {}
    }
  }
};
// @lc code=end
