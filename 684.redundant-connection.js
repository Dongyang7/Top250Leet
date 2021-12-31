/*
 * @lc app=leetcode id=684 lang=javascript
 *
 * [684] Redundant Connection
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */

// union find, 我没有创立class，只是用parent和find。相比于leetcode的答案，我没有用rank arr，而是只用了parent，如果parent[node]<0，表示node就是一个set的root，-n就表示set里面有n个数字。-1表示rank为1，也就是set里面只有node自己。
var findRedundantConnection = function (edges) {
  let n = edges.length;
  let parent = Array(n + 1).fill(-1);
  const find = (node) => {
    if (parent[node] > 0) {
      parent[node] = find(parent[node]); // compress find path, now find will take constant time afterwards
      return parent[node];
    }
    return node;
  };
  for (let [par, child] of edges) {
    let [root1, root2] = [find(par), find(child)];
    if (root1 === root2) {
      return [par, child];
    }
    if (parent[root2] < parent[root1]) {
      parent[root2] += parent[root1];
      parent[root1] = root2;
    } else {
      parent[root1] += parent[root2];
      parent[root2] = root1;
    }
  }
};
// @lc code=end
