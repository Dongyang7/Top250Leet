/*
 * @lc app=leetcode id=78 lang=javascript
 *
 * [78] Subsets
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// DFS, 要注意的是，array.push()这个操作里，Objects and arrays are pushed as a pointer to the original object . Built-in primitive types like numbers or booleans are pushed as a copy
var subsets = function (nums) {
  if (!nums) return [];
  let res = [[]];
  if (nums.length === 0) return res;
  const helper = (startIndex, startSubset) => {
    // doing a deep copy here
    res.push([...startSubset]);
    for (let i = startIndex + 1; i < nums.length; i++) {
      startSubset.push(nums[i]);
      helper(i, startSubset);
      startSubset.pop();
    }
  };
  for (let j = 0; j < nums.length; j++) {
    helper(j, [nums[j]]);
  }
  return res;
};
// v2 backtracking 其实backtracking并不需要有意地回溯到之前的某一节点，而是由iteration来handle，当目前这个branch无法继续深入求解，程序自然会开始进行下一个iteration loop来继续执行，而这个loop肯定是branch的一个分岔点，也就是我们想要回溯到的地方
var subsets = function (nums) {
  if (!nums) return [];
  let res = [];
  if (nums.length === 0) return res;
  const helper = (startIndex, startSubset) => {
    // doing a deep copy here
    res.push([...startSubset]);
    for (let i = startIndex; i < nums.length; i++) {
      startSubset.push(nums[i]);
      helper(i + 1, startSubset);
      startSubset.pop();
    }
  };
  helper(0, []);
  return res;
};
// @lc code=end
