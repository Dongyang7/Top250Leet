var findTreasure = (board, start, end) => {
  let [res, m, n, treasureCount] = [[], board.length, board[0].length, 0];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 1) treasureCount++;
    }
  }
  const backtrack = ([row, col], path) => {
    if (row === end[0] && col === end[1] && treasureCount === 0)
      res.push([...path]);
    else {
      let adjCells = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];
      for (let [i, j] of adjCells) {
        if (
          i >= 0 &&
          i < m &&
          j >= 0 &&
          j < n &&
          (board[i][j] === 0 || board[i][j] === 1)
        ) {
          if (board[i][j] === 1) {
            treasureCount--;
          }
          let tmp = board[i][j];
          path.push([i, j]);
          board[i][j] = 2;
          backtrack([i, j], path);
          path.pop();
          board[i][j] = tmp;
          if (board[i][j] === 1) {
            treasureCount++;
          }
        }
      }
    }
  };
  if (board[start[0]][start[1]] === 1) treasureCount--;
  backtrack(start, [start]);
  let minLen = Number.MAX_SAFE_INTEGER;
  for (arr of res) {
    minLen = Math.min(minLen, arr.length);
  }
  res = res.filter((arr) => arr.length === minLen);
  console.log(res);
  return res;
};
var board3 = [
  [1, 0, 0, 0, 0],
  [0, -1, -1, 0, 0],
  [0, -1, 0, 1, 0],
  [-1, 0, 0, 0, 0],
  [0, 1, -1, 0, 0],
  [0, 0, 0, 0, 0],
];
findTreasure(board3, [5, 2], [2, 0]);
