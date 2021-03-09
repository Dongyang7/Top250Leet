/*
 * @lc app=leetcode id=289 lang=javascript
 *
 * [289] Game of Life
 */

// @lc code=start
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
  if (!board || !board.length || !board[0].length) return;
  let height = board.length;
  let width = board[0].length;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let liveNNum = 0;
      for (let neighborR = r - 1; neighborR <= r + 1; neighborR++) {
        if (neighborR >= height || neighborR < 0) continue;
        for (let neighborC = c - 1; neighborC <= c + 1; neighborC++) {
          if (
            neighborC >= width ||
            neighborC < 0 ||
            (neighborC === c && neighborR === r)
          )
            continue;
          liveNNum += board[neighborR][neighborC] > 0 ? 1 : 0;
        }
      }
      if (board[r][c] === 0) {
        if (liveNNum === 3) board[r][c] = -1;
      } else {
        if (liveNNum < 2 || liveNNum > 3) board[r][c] = 2;
      }
    }
  }
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (board[r][c] === 2) board[r][c] = 0;
      else if (board[r][c] === -1) board[r][c] = 1;
    }
  }
};
// @lc code=end
