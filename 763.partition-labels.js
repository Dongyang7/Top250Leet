/*
 * @lc app=leetcode id=763 lang=javascript
 *
 * [763] Partition Labels
 */

// @lc code=start
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function (S) {
  const lastPosMap = {};
  for (let i = 0; i < S.length; i++) {
    lastPosMap[S[i]] = i;
  }
  let [start, cur, curPartitionMax, res] = [-1, 0, 0, []];
  while (cur < S.length) {
    curPartitionMax = Math.max(curPartitionMax, lastPosMap[S[cur]]);
    if (cur === curPartitionMax) {
      res.push(cur - start);
      start = cur;
    }
    cur++;
  }
  if (res.length === 0) return [S.length];
  return res;
};
// @lc code=end
