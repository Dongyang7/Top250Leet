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

var numIslands = function (grid) {
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

// 2021 redo

var numIslands = function (grid) {
  if (!grid || !grid.length || !grid[0].length) return 0;
  let [m, n, res] = [grid.length, grid[0].length, 0];
  const dfs = (i, j) => {
    if (i >= 0 && i < m && j >= 0 && j < n && grid[i][j] == 1) {
      grid[i][j] = "#";
      dfs(i - 1, j);
      dfs(i + 1, j);
      dfs(i, j - 1);
      dfs(i, j + 1);
    }
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 1) {
        res++;
        dfs(i, j);
      }
    }
  }
  return res;
};
// union find
var numIslands = function (grid) {
  class UnionFind {
    constructor(array) {
      let [m, n] = [array.length, array[0].length];
      this.parent = Array(m * n);
      this.count = 0;
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (array[i][j] === "1") {
            this.parent[i * n + j] = i * n + j;
            this.count++;
          }
        }
      }
    }
    find(idx) {
      if (this.parent[idx] >= 0 && this.parent[idx] !== idx) {
        this.parent[idx] = this.find(this.parent[idx]);
        return this.parent[idx];
      }
      return idx;
    }
    union(idx1, idx2) {
      let [parent1, parent2] = [this.find(idx1), this.find(idx2)];
      if (parent1 !== parent2) {
        if (this.parent[parent1] >= 0 && this.parent[parent2] >= 0) {
          this.parent[parent1] = -2;
          this.parent[parent2] = parent1;
        } else if (this.parent[parent1] >= 0 && this.parent[parent2] < 0) {
          this.parent[parent1] = parent2;
          this.parent[parent2]--;
        } else if (this.parent[parent2] >= 0 && this.parent[parent1] < 0) {
          this.parent[parent2] = parent1;
          this.parent[parent1]--;
        } else if (this.parent[parent2] < 0 && this.parent[parent1] < 0) {
          if (this.parent[parent2] < this.parent[parent1]) {
            this.parent[parent2] += this.parent[parent1];
            this.parent[parent1] = parent2;
          } else {
            this.parent[parent1] += this.parent[parent2];
            this.parent[parent2] = parent1;
          }
        }
        this.count--;
      }
    }
  }
  let uf = new UnionFind(grid);
  let [m, n] = [grid.length, grid[0].length];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        grid[i][j] = "#";
        let adjList = [
          [i - 1, j],
          [i + 1, j],
          [i, j - 1],
          [i, j + 1],
        ];
        for (let [row, col] of adjList) {
          if (
            row >= 0 &&
            row < m &&
            col >= 0 &&
            col < n &&
            grid[row][col] === "1"
          ) {
            uf.union(i * n + j, row * n + col);
          }
        }
      }
    }
  }
  return uf.count;
};
// @lc code=end
