/*
 * @lc app=leetcode id=2 lang=javascript
 *
 * [2] Add Two Numbers
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let head = new ListNode(0, null);
  let prevHead = null;
  const dummy = head;
  let addOn = 0;
  while (l1 || l2) {
    let sum = (l1 || { val: 0 }).val + (l2 || { val: 0 }).val + head.val;
    addOn = Math.floor(sum / 10);
    head.val = sum % 10;
    head.next = new ListNode(addOn, null);
    prevHead = head;
    head = head.next;
    l1 = (l1 || { next: null }).next;
    l2 = (l2 || { next: null }).next;
  }
  if (head.val === 0) prevHead.next = null;
  return dummy;
};
// @lc code=end
