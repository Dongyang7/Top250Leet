/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let len = height.length;
  if (len < 3) return 0;
  let left, right;
  var stoneStack = [];
  let totalWater = 0;
  for (let i = 1; i < len; i++) {
    if (left === undefined) {
      if (height[i] < height[i - 1]) {
        left = i - 1;
        stoneStack.push(height[i]);
        continue;
      }
    } else {
      if (height[i] >= left) {
        //height*width(square) minus volume of the rockbed underwater
        totalWater +=
          height[left] * (i - left - 1) -
          stoneStack.reduce((acc, cur) => acc + cur, 0);
        left = undefined;
        stoneStack = [];
      } else if (
        height[i] > height[i - 1] &&
        (height[i] > height[i + 1] || i === len - 1)
      ) {
        // totalWater += Math.min(height[left], height[i])*(i - left - 1)

        let tmp = stoneStack.pop();
        while (tmp !== undefined && tmp < height[i]) {
          totalWater -= tmp;
          tmp = stoneStack.pop();
        }
      } else {
        stoneStack.push(height[i]);
      }
    }
  }
};
// @lc code=end
