/*
 * @lc app=leetcode id=236 lang=javascript
 *
 * [236] Lowest Common Ancestor of a Binary Tree
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// won't work because this is not complete tree
var lowestCommonAncestor = function (root, p, q) {
  if (root.val === p.val || root.val === q.val) return root;
  if (p.val === q.val) return p;
  let queue = [[root, 0]];
  let pIdx,
    qIdx,
    idx = 1;
  while (queue.length > 0) {
    let [curNode, curIdx] = queue.shift();
    if (curNode) {
      if (curNode.val === p.val) {
        pIdx = curIdx;
      }
      if (curNode.val === q.val) {
        qIdx = curIdx;
      }
      if (pIdx && qIdx) break;
    }
    queue.push(
      [(curNode || { left: null }).left, idx++],
      [(curNode || { right: null }).right, idx++]
    );
  }
};
// use DFS, heap out of memory because of all these new arrays I created
var lowestCommonAncestor = function (root, p, q) {
  if (root.val === p.val || root.val === q.val) return root;
  let pArray, qArray;
  const dfs = (node, arr) => {
    arr.push(node);
    if (node.val === p.val) {
      pArray = arr;
    }
    if (node.val === q.val) {
      qArray = arr;
    }
    if (pArray && qArray) return;
    if (node.left) dfs(node.left, [...arr]);
    if (node.right) dfs(node.right, [...arr]);
  };
  dfs(root, []);
  // console.log(pArray, qArray)
  let i = 0;
  while (i <= Math.min(pArray.length, qArray.length)) {
    if (
      i === Math.min(pArray.length, qArray.length) ||
      pArray[i].val !== qArray[i].val
    ) {
      return pArray[i - 1];
    }
    i++;
  }
};
// correct DFS
var lowestCommonAncestor = function (root, p, q) {
  if (root.val === p.val || root.val === q.val) return root;
  let res;
  const dfs = (node) => {
    if (node) {
      let resL = dfs(node.left);
      let resR = dfs(node.right);
      if (resL && resR) {
        res = node;
        return;
      }
      if (node.val === p.val || node.val === q.val) {
        if (resL || resR) {
          res = node;
          return;
        }
        return true;
      }
      if (resL || resR) {
        return true;
      }
    }
  };
  dfs(root);
  return res;
};
// @lc code=end
