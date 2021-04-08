/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// dfs???
var countComponents = function (n, edges) {
  const adList = {};
  for (let i = 0; i < edges.length; i++) {
    if (!adList[edges[i][0]]) {
      adList[edges[i][0]] = edges[i][1];
    } else {
      adList[edges[i][0]].push(edges[i][1]);
    }
    if (!adList[edges[i][1]]) {
      adList[edges[i][1]] = edges[i][0];
    } else {
      adList[edges[i][1]].push(edges[i][0]);
    }
  }
  const [stack, parent, seen] = [[0], { 0: -1 }, new Array(n).fill(false)];
  while (stack.length > 0) {
    let node = stack.pop();
  }
};
// union find

var countComponents = function (n, edges) {
  const groupHash = {};
  for (let i = 0; i < n; i++) {
    groupHash[i] = i;
  }
  const find = (node) => {
    if (node !== groupHash[node]) groupHash[node] = find(groupHash[node]);
  };
  const union = ([node1, node2]) => {
    let [group1, group2] = [find(node1), find(node2)];
    if (group1 !== group2) groupHash[group1] = group2;
  };
  for (let i = 0; i < edges; i++) {
    union(edges[i]);
  }
  const resMap = {};
  for (let i = 0; i < n; i++) {
    find(i);
    resMap[groupHash[i]] = 1;
  }
  return Object.keys(resMap).length;
};
// @lc code=end
