/*
 * @lc app=leetcode id=103 lang=javascript
 *
 * [103] Binary Tree Zigzag Level Order Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if (root === null) return [];
  const resArr = [];
  let currentLevel = [root];
  let isEvenLevel = false;
  while (currentLevel.length > 0) {
    let nextLevel = [];
    let currentLevelVals = [];
    for (let i = currentLevel.length - 1; i >= 0; i += 1) {
      let node = currentLevel[i];
      if (isEvenLevel) {
        if (node.right !== null) {
          nextLevel.push(node.right);
        }
        if (node.left !== null) {
          nextLevel.push(node.left);
        }
      } else {
        if (node.left !== null) {
          nextLevel.push(node.left);
        }
        if (node.right !== null) {
          nextLevel.push(node.right);
        }
      }
      currentLevelVals.push(node.val);
    }
    currentLevel = nextLevel;
    resArr.push(currentLevelVals);
    isEvenLevel = !isEvenLevel;
  }
  return resArr;
};
// @lc code=end
