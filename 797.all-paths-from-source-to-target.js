/*
 * @lc app=leetcode id=797 lang=javascript
 *
 * [797] All Paths From Source to Target
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
// time & space both are O(2^N⋅N)
var allPathsSourceTarget = function (graph) {
  let n = graph.length;
  const res = [];
  const helper = (node, path) => {
    let nextLevel = graph[node];
    for (let i = 0; i < nextLevel.length; i++) {
      if (nextLevel[i] === n - 1) res.push([...path, n - 1]);
      else helper(nextLevel[i], [...path, nextLevel[i]]);
    }
  };
  helper(0, [0]);
  return res;
};
// @lc code=end
