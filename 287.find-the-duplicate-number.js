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
// @lc code=end
