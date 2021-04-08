/*
 * @lc app=leetcode id=260 lang=javascript
 *
 * [261] Graph Valid Tree
 * You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

Return true if the edges of the given graph make up a valid tree, and false otherwise.
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
/* A valid tree means the graph only has one group and there's no circle inside */
var validTree = function (n, edges) {
  if (edges.length !== n - 1) return false;
  const hash = {};
  const find = (node) => {
    if (hash[node] === undefined) hash[node] = node;
    let groupId = hash[node];
    if (groupId !== node) {
      hash[node] = find(groupId);
    }
    return hash[node];
  };
  const union = (node1, node2) => {
    let [group1, group2] = [find(node1), find(node2)];
    if (group1 !== group2) {
      hash[group1] = group2;
    }
  };
  for (let i = 0; i < edges.length; i++) {
    union(edges[i][0], edges[i][1]);
  }
  for (let i = 0; i < n; i++) {
    find(i);
    if (hash[i] === undefined) return false;
    if (i >= 1 && hash[i] !== hash[i - 1]) return false;
  }
  return true;
};
// @lc code=end
