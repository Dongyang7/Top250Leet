/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
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
 * @return {boolean}
 */
// 每个node的value都应该在一个range里面，我们每次向下search时都要更新child的range。注意不要简单地比较当前node和child value的关系，因为child所在的左/右branch要全部小于/大于那个根node，而这个root可能是好几个level上面的了，所以需要keep一个range变量一层层传递下去。
// BFS:
var isValidBST = function (root) {
  let queue = [
    { node: root, range: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER] },
  ];
  while (queue.length > 0) {
    let { node, range } = queue.shift();
    if (node.val < range[0] || node.val > range[1]) {
      return false;
    }
    if (node.left) queue.push({ node: node.left, range: [range[0], node.val] });
    if (node.right)
      queue.push({ node: node.right, range: [node.val, range[1]] });
  }
  return true;
};
// DFS:
var isValidBST = function (root) {
  const helper = (node, lower, upper) => {
    if (node === null) return true;
    const l = node.left;
    const r = node.right;
    const val = node.val;
    if (val <= lower || val >= upper) return false;
    return helper(l, lower, val) && helper(r, val, upper);
  };
  return helper(root, -Number.MAX_VALUE, Number.MAX_VALUE);
};
// @lc code=end
