/*
 * @lc app=leetcode id=174 lang=javascript
 *
 * [174] Dungeon Game
 */

// @lc code=start
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
  let [m, n] = [dungeon.length, dungeon[0].length];
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1) {
        if (j === n - 1) {
          dungeon[i][j] = Math.max(1, 1 - dungeon[i][j]);
        } else {
          dungeon[i][j] = Math.max(1, dungeon[i][j + 1] - dungeon[i][j]);
        }
      } else if (j === n - 1) {
        dungeon[i][j] = Math.max(1, dungeon[i + 1][j] - dungeon[i][j]);
      } else {
        dungeon[i][j] = Math.max(
          1,
          Math.min(dungeon[i + 1][j], dungeon[i][j + 1]) - dungeon[i][j]
        );
      }
    }
  }
  return dungeon[0][0];
};
// @lc code=end
