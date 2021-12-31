/*
You are given an m x n grid rooms initialized with these three possible values.

-1 A wall or an obstacle.
0 A gate.
INF Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.
 */

// @lc code=start
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
/**DFS算法一定要保证向下搜索时，下面的level不能再次回到上一层level；本题中在每一个level都保存了当前的step变量，调用dfs时只需对比传入steps和当前steps就能保证每次dfs是向下延伸的。有时我们也可以直接将搜索过的cell用一些#%¥等能够辨识出来的字符代替。 */
var wallsAndGates = function (rooms) {
  if (!rooms || !rooms.length || !rooms[0].length) return;
  let [m, n] = [rooms.length, rooms[0].length];
  const dfs = (i, j, steps) => {
    if (
      i >= 0 &&
      i < m &&
      j >= 0 &&
      j < n &&
      rooms[i][j] >= 0 &&
      steps <= rooms[i][j]
    ) {
      rooms[i][j] = steps;
      dfs(i - 1, j, steps + 1);
      dfs(i + 1, j, steps + 1);
      dfs(i, j - 1, steps + 1);
      dfs(i, j + 1, steps + 1);
    }
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === 0) {
        dfs(i, j, 0);
      }
    }
  }
};
// BFS
var wallsAndGates = function (rooms) {
  const [ROOM, GATE] = [2147483647, 0];
  if (!rooms || !rooms.length || !rooms[0].length) return;
  let [m, n, queue] = [rooms.length, rooms[0].length, []];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === GATE) queue.push([i, j]);
    }
  }
  const getAdjcentRooms = ([r, c]) => {
    return [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ];
  };
  while (queue.length > 0) {
    let curPos = queue.shift();
    for (let [r, c] of getAdjcentRooms(curPos)) {
      if (r >= 0 && r < m && c >= 0 && c < n && rooms[r][c] === ROOM) {
        // rooms[r][c] === ROOM这一步保证了已经write了的cell不会被再次write
        rooms[r][c] = rooms[curPos[0]][curPos[1]] + 1;
        queue.push([r, c]);
      }
    }
  }
};
// @lc code=end
