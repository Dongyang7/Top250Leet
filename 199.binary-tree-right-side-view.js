/*
 * @lc app=leetcode id=199 lang=javascript
 *
 * [199] Binary Tree Right Side View
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
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return [];
  const queue = [[root, 0]];
  let res = [];
  while (queue.length > 0) {
    let [curNode, depth] = queue.shift();
    if (queue.length === 0 || depth < queue[0][1]) {
      res.push(curNode.val);
    }
    if (curNode.left) {
      queue.push([curNode.left, depth + 1]);
    }
    if (curNode.right) {
      queue.push([curNode.right, depth + 1]);
    }
  }
  return res;
};
// @lc code=end
