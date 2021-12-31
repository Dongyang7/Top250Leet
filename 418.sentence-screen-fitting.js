/*
 * @lc app=leetcode id=419 lang=javascript
 *
 * [419] Battleships in a Board
 */

// @lc code=start
/**
 * @param {string[]} sentence
 * @param {number} rows
 * @param {number} cols
 * @return {number}
 */
var wordsTyping = function (sentence, rows, cols) {
  let [res, curRow, curSIdx, curCol] = [0, 0, 0, 0];
  while (curRow < rows) {
    while (curCol + sentence[curSIdx].length <= cols) {
      curCol += sentence[curSIdx].length + 1;
      if (curSIdx === sentence.length - 1) {
        res++;
        curSIdx = 0;
      } else {
        curSIdx++;
      }
    }
    curCol = 0;
    curRow += 1;
  }
  return res;
};
// @lc code=end
