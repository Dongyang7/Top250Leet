/*
 * @lc app=leetcode id=102 lang=javascript
 *
 * [102] Binary Tree Level Order Traversal
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
 * @return {number[][]}
 */
// basic BFS implementation with queue, keep一个childNodeNum用来check某一层的node何时被遍历完，在这时push当前level的array
var levelOrder = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  let [levelRes, childNodeNum] = [[], 0];
  while (queue.length > 0) {
    let curNode = queue.shift();
    levelRes.push(curNode.val);
    if (curNode.left) {
      queue.push(curNode.left);
      childNodeNum++;
    }
    if (curNode.right) {
      queue.push(curNode.right);
      childNodeNum++;
    }
    if (childNodeNum === queue.length) {
      res.push(levelRes);
      [levelRes, childNodeNum] = [[], 0];
    }
  }
  return res;
};
// @lc code=end
