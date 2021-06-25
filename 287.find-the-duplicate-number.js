/*
 * @lc app=leetcode id=287 lang=javascript
 *
 * [287] Find the Duplicate Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

//version 1，最蠢的hashmap表
var findDuplicate = function (nums) {
  let obj = {};
  for (let i = 0; i < nums.length; i++) {
    if (obj[nums[i]] !== undefined) return nums[i];
    else {
      obj[nums[i]] = i;
    }
  }
};
// 当作存在环的linked list来处理
// The tortoise started from zero, so its position after F steps is F; The hare started at the intersection point F + a = nC, so its position after F steps is nC + F, that is the same point as F; So the tortoise and the (slowed down) hare will meet at the entrance of the cycle.
var findDuplicate = function (nums) {
  const head = nums[0];
  let [slow, fast] = [nums[head], nums[nums[head]]];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }
  slow = head;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
};
// 下面这个版本我们把坐标0当作了head，也是正确的，我们只要保证第二轮时slow从head出发就行。否则在第二个循环中会永远无法相遇
var findDuplicate = function (nums) {
  let head = 0;
  let [fast, slow] = [nums[nums[head]], nums[head]];
  while (fast !== slow) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }
  slow = head;
  while (fast !== slow) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
};
// @lc code=end
