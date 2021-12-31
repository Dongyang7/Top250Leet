/*
 * @lc app=leetcode id=79 lang=javascript
 *
 * [79] Word Search
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let [m, n] = [board.length, board[0].length];
  const backtrack = (i, j, charIdx, visited) => {
    if (charIdx === word.length - 1) {
      return true;
    } else {
      let adjCell = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ];
      for (let [row, col] of adjCell) {
        if (
          row >= 0 &&
          row < m &&
          col >= 0 &&
          col < n &&
          board[row][col] === word[charIdx + 1] &&
          !visited[row][col]
        ) {
          visited[row][col] = true;
          if (backtrack(row, col, charIdx + 1, visited)) return true;
          visited[row][col] = false;
        }
      }
    }
  };
  var visited = Array.from(Array(m), () => Array(n).fill(false));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        visited[i][j] = true;
        if (backtrack(i, j, 0, visited)) return true;
        visited[i][j] = false;
      }
    }
  }
  return false;
};
// use board in-place; backtrack解决问题时一定要注意‘清理’，有时是清理一个保存有当前解的set，有时是清理对某个input做的改动，像本题中，是清理掉当前位置mark的visted char‘#’。
var exist = function (board, word) {
  let [m, n] = [board.length, board[0].length];
  const backtrack = (i, j, charIdx) => {
    if (charIdx === word.length - 1) {
      return true;
    } else {
      let adjCell = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ];
      for (let [row, col] of adjCell) {
        if (
          row >= 0 &&
          row < m &&
          col >= 0 &&
          col < n &&
          board[row][col] === word[charIdx + 1]
        ) {
          board[row][col] = "#";
          let res = backtrack(row, col, charIdx + 1);
          board[row][col] = word[charIdx + 1];
          if (res) return true;
        }
      }
    }
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        board[i][j] = "#";
        if (backtrack(i, j, 0)) {
          board[i][j] = word[0];
          return true;
        }
        board[i][j] = word[0];
      }
    }
  }
  return false;
};
// @lc code=end
