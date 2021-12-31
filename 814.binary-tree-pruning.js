/*
 * @lc app=leetcode id=814 lang=javascript
 *
 * [814] Binary Tree Pruning
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var pruneTree = function (root) {
  const hasOne = (node) => {
    if (!node) {
      return false;
    } else {
      if (!hasOne(node.left) && !hasOne(node.right) && node.val !== 1) {
        return false;
      }
      if (!hasOne(node.left)) {
        node.left = null;
      }
      if (!hasOne(node.right)) {
        node.right = null;
      }
      return true;
    }
  };
  if (!hasOne(root)) return null;
  return root;
};
// @lc code=end
