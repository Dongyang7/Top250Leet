/*
 * @lc app=leetcode id=142 lang=javascript
 *
 * [142] Linked List Cycle II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (!head || !head.val || !head.next || !head.next.next) return null;
  let [slow, fast] = [head.next, head.next.next];
  while (slow !== fast) {
    if (fast === null || fast.next === null || fast.next.next === null)
      return null;
    slow = slow.next;
    fast = fast.next.next;
  }
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
};
// @lc code=end
