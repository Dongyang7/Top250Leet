/*
 * @lc app=leetcode id=430 lang=javascript
 *
 * [430] Flatten a Multilevel Doubly Linked List
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
  const dfs = (node, curLevelNext) => {
    while (node) {
      if (node.child) {
        let nextNode = node.next;
        node.next = node.child;
        node.child.prev = node;
        dfs(node.child, nextNode);
        node.child = null;
      }
      if (node.next === null && curLevelNext) {
        node.next = curLevelNext;
        curLevelNext.prev = node;
        return;
      } else {
        node = node.next;
      }
    }
  };
  dfs(head, null);
  return head;
};
// @lc code=end
