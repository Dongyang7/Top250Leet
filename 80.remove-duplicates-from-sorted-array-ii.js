/*
 * @lc app=leetcode id=80 lang=javascript
 *
 * [80] Remove Duplicates from Sorted Array II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/*i和n两个指针，一开始齐头并进，同时指向一个位置，当前的数值不大于他前前位置的数值时，意味着出现了3个
或3个以上的相同值，此时不满足if条件，i停留在不满足的位置，等待下一个更大的数来替换，当出现下一个更大的
数字时再次满足if条件，将i所指向的位置替换为该数字，i指向下一个等待替换，此时if条件再次用以检测用来替换
的数字，以保证不出现两次以上的重复。 */
var removeDuplicates = function (nums) {
  let i = 0;
  for (let n = 0; n < nums.length; n++) {
    if (i < 2 || nums[n] > nums[i - 2]) {
      nums[i] = nums[n];
      i++;
    }
  }
  return i;
};
// @lc code=end
