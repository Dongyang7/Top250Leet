/*
 * @lc app=leetcode id=365 lang=javascript
 *
 * [365] Water and Jug Problem
 */

// @lc code=start
/**
 * @param {number} jug1Capacity
 * @param {number} jug2Capacity
 * @param {number} targetCapacity
 * @return {boolean}
 */
var canMeasureWater = function (jug1Capacity, jug2Capacity, targetCapacity) {
  let [large, small, numSet] = [
    Math.max(jug1Capacity, jug2Capacity),
    Math.min(jug1Capacity, jug2Capacity),
    new Set(),
  ];
  numSet.add(large);
  numSet.add(small);
  numSet.add(large + small);
  let remain = 1;
  if (numSet.has(targetCapacity)) return true;
  while (remain > 0) {
    let k = 0;
    while (large - k++ * small >= 0) {
      numSet.add(large - k++ * small);
      if (large - k++ * small === targetCapacity) return true;
      k--;
    }
    remain = large % small;
    if (remain === targetCapacity) return true;
    large += remain;
    if (large === targetCapacity) return true;
  }
  return false;
};
// @lc code=end
