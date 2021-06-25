/*
 * @lc app=leetcode id=785 lang=javascript
 *
 * [785] Is Graph Bipartite?
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
// 题目描述里面说的“所有edge都连接着分别在两个set里面的node”，这句话可以理解为“在一个set里面，没有任何的edge”。所以我们需要遍历graph node，一个node保存到set1后，它的邻居node肯定在set2，我们再遍历邻居node array，如果过程中出现一个node不该出现在某个set里面，我们就可以返回false了。同时记得用visited来记录遍历过的node
var isBipartite = function (graph) {
  let setArr = [new Set(), new Set()];
  let visited = new Set();
  const dfs = (node, curSet) => {
    if (setArr[curSet === 0 ? 1 : 0].has(node)) return false;
    if (visited.has(node)) return true;
    setArr[curSet].add(node);
    visited.add(node);
    let nextLevel = graph[node];
    for (let i = 0; i < nextLevel.length; i++) {
      if (dfs(nextLevel[i], curSet === 0 ? 1 : 0) === false) return false;
    }
  };
  let res = true;
  for (let i = 0; i < graph.length; i++) {
    if (!visited.has(i)) {
      let tmp = dfs(i, 0);
      if (tmp === false) {
        res = false;
        break;
      }
    }
  }
  return res;
};
// @lc code=end
