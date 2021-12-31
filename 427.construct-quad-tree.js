/*
 * @lc app=leetcode id=427 lang=javascript
 *
 * [427] Construct Quad Tree
 */

// @lc code=start
/**
 * // Definition for a QuadTree node.
 * function Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {number[][]} grid
 * @return {Node}
 */
// Bottom up approach, nodeGrid contains every cell as a node initially, we always store all the info of a section in top left cell of a section, where the section is represented as a node in the final tree. 这种保存数据的方法我好像也在哪里见过，所以才会想起来使用；说起来，这个让我想起之前实现heap时用的array，就是用idx的数学关系来代表node的child parent关系。
var construct = function (grid) {
  let step = 1;
  let n = grid.length;
  const nodeGrid = Array.from(Array(n), () => Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      nodeGrid[i][j] = new Node(grid[i][j], true);
    }
  }
  const isOneLeaf = (row, col) => {
    for (let node of [
      [row + step, col],
      [row + step, col + step],
      [row, col + step],
    ]) {
      if (
        !nodeGrid[row][col].isLeaf ||
        !nodeGrid[node[0]][node[1]].isLeaf ||
        nodeGrid[row][col].val !== nodeGrid[node[0]][node[1]].val
      ) {
        return false;
      }
    }
    return true;
  };
  while (step < n) {
    for (let row = 0; row < n; row += 2 * step) {
      for (let col = 0; col < n; col += 2 * step) {
        if (isOneLeaf(row, col)) {
          nodeGrid[row][col] = new Node(nodeGrid[row][col].val, true);
        } else {
          nodeGrid[row][col] = new Node(
            1,
            false,
            nodeGrid[row][col],
            nodeGrid[row][col + step],
            nodeGrid[row + step][col],
            nodeGrid[row + step][col + step]
          );
        }
      }
    }
    step *= 2;
  }
  return nodeGrid[0][0];
};
// @lc code=end
