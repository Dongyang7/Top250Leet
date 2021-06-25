/*
 * @lc app=leetcode id=328 lang=javascript
 *
 * [328] Odd Even Linked List
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
  let [dummy, isOdd, prevOdd, firstEven, prevEven] = [
    new ListNode(0, head),
    true,
    null,
    null,
    null,
  ];
  if (head === null || head.next === null) {
    return head;
  }
  while (head !== null) {
    if (prevOdd && prevEven) {
      if (isOdd) {
        prevOdd.next = head;
        prevOdd = head;
      } else {
        prevEven.next = head;
        prevEven = head;
      }
    } else {
      if (isOdd) {
        prevOdd = head;
      } else {
        prevEven = head;
        firstEven = head;
      }
    }
    head = head.next;
    isOdd = !isOdd;
  }
  prevOdd.next = firstEven;
  prevEven.next = null;
  return dummy.next;
};
// @lc code=end
