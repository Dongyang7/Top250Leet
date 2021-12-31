/*
 * @lc app=leetcode id=735 lang=javascript
 *
 * [735] Asteroid Collision
 */

// @lc code=start
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  const stack = [];
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i] < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] > 0 &&
        stack[stack.length - 1] < -asteroids[i]
      ) {
        stack.pop();
      }
      if (stack.length > 0 && stack[stack.length - 1] === -asteroids[i]) {
        stack.pop();
        continue;
      }
      if (stack.length === 0 || stack[stack.length - 1] < 0) {
        stack.push(asteroids[i]);
      }
    } else {
      stack.push(asteroids[i]);
    }
  }
  return stack;
};
// @lc code=end
