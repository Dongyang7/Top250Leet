/*
 * @lc app=leetcode id=124 lang=javascript
 *
 * [124] Binary Tree Maximum Path Sum
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
 * @return {number}
 */
// 对一个node来讲，以它为root的path，sum来自于三部分：左，右，根。如果左右子树能够提供的gain（maxL,maxR）是负数或零，我们就舍弃掉它；如果根结点是负数，我们依旧要计算上它，我们要保证所有node都小于零的情况下也有输出。另外不用担心max sum path存在于子树里，因为这种情况我们dfs自下而上肯定已经计算过了。
// dfs遍历tree，在每个node处都算一下以当前位置为root能够构成的path的max是多少。同时我们返回当前node能够提供给parent的gain（正数或零）是多少。
var maxPathSum = function (root) {
  let res = Number.MIN_SAFE_INTEGER;
  const dfs = (node) => {
    if (node) {
      let maxL = dfs(node.left);
      let maxR = dfs(node.right);
      res = Math.max(res, node.val + maxL + maxR); // 由这个node作为root的path的max
      return Math.max(node.val + Math.max(maxL, maxR), 0); // 当前node能够提供给parent的gain（正数或零）是多少
    } else {
      return 0;
    }
  };
  dfs(root);
  return res;
};
// @lc code=end
