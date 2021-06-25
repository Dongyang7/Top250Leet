/*
 * @lc app=leetcode id=99 lang=javascript
 *
 * [99] Recover Binary Search Tree
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
// BST的inorder traversal是个sorted array，我们可以利用这点，先得到array，再寻找里面被替换的两个node
var recoverTree = function (root) {
  const valArr = [];
  const getArr = (node) => {
    if (node.left) getArr(node.left);
    valArr.push(node.val);
    if (node.right) getArr(node.right);
  };
  getArr(root);
  let swapArr;
  for (let i = valArr.length - 1; i > 0; i--) {
    let j = i - 1;
    if (valArr[i] < valArr[j]) {
      while (j >= 0 && valArr[i] < valArr[j]) {
        j--;
      }
      swapArr = [valArr[j + 1], valArr[i]];
      break;
    }
  }
  const recover = (node, count) => {
    if (node.val === swapArr[0]) {
      node.val = swapArr[1];
      if (--count === 0) return;
    } else if (node.val === swapArr[1]) {
      node.val = swapArr[0];
      if (--count === 0) return;
    }
    if (node.left) recover(node.left, count);
    if (node.right) recover(node.right, count);
  };
  recover(root, 2);
};
// Morris Inorder Traversal

// @lc code=end
