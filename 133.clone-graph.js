/*
 * @lc app=leetcode id=133 lang=javascript
 *
 * [133] Clone Graph
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  const nodeCopyArr = [];
  const dfs = (vertex) => {
    if (!vertex) return null;
    let val = vertex.val;
    while (nodeCopyArr.length < val) {
      nodeCopyArr.push(undefined);
    }
    let vertexCopy = new Node(val);
    if (val === nodeCopyArr.length) nodeCopyArr.push(vertexCopy);
    else nodeCopyArr[val] = vertexCopy;
    vertexCopy.neighbors = vertex.neighbors.map((neighbor) => {
      if (nodeCopyArr[neighbor.val]) return nodeCopyArr[neighbor.val];
      return dfs(neighbor);
    });
    return vertexCopy;
  };
  return dfs(node);
};
// @lc code=end
