/*
 * @lc app=leetcode id=200 lang=javascript
 *
 * [200] Number of Islands
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */

var numIslands = function(grid) {
  const isValideIndex = (row, col) => {
    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
      return false;
    return true;
  };
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
  const lands = [];
  grid.forEach((row, rowIdx) => {
    row.forEach((block, colIdx) => {
      if (block == 1) lands.push(JSON.stringify([rowIdx, colIdx]));
    });
  });
  if (lands.length <= 1) return lands.length;
  let res = 0;
  while (lands.length > 0) {
    let start = lands[0];
    lands.splice(0, 1);
    let currentLevel = [start];
    while (currentLevel.length > 0) {
      let nextLevel = [];
      for (let i = 0; i < currentLevel.length; i += 1) {
        let curIdx = JSON.parse(currentLevel[i]);
        let up = JSON.stringify([curIdx[0] - 1, curIdx[1]]);
        let down = JSON.stringify([curIdx[0] + 1, curIdx[1]]);
        let left = JSON.stringify([curIdx[0], curIdx[1] - 1]);
        let right = JSON.stringify([curIdx[0], curIdx[1] + 1]);
        if (
          isValideIndex(curIdx[0] - 1, curIdx[1]) &&
          grid[curIdx[0] - 1][curIdx[1]] == 1 &&
          lands.indexOf(up) !== -1
        ) {
          nextLevel.push(up);
          lands.splice(lands.indexOf(up), 1);
        }
        if (
          isValideIndex(curIdx[0] + 1, curIdx[1]) &&
          grid[curIdx[0] + 1][curIdx[1]] == 1 &&
          lands.indexOf(down) !== -1
        ) {
          nextLevel.push(down);
          lands.splice(lands.indexOf(down), 1);
        }
        if (
          isValideIndex(curIdx[0], curIdx[1] - 1) &&
          grid[curIdx[0]][curIdx[1] - 1] == 1 &&
          lands.indexOf(left) !== -1
        ) {
          nextLevel.push(left);
          lands.splice(lands.indexOf(left), 1);
        }
        if (
          isValideIndex(curIdx[0], curIdx[1] + 1) &&
          grid[curIdx[0]][curIdx[1] + 1] == 1 &&
          lands.indexOf(right) !== -1
        ) {
          nextLevel.push(right);
          lands.splice(lands.indexOf(right), 1);
        }
      }
      currentLevel = nextLevel;
    }
    res += 1;
  }
  return res;
};
// @lc code=end
