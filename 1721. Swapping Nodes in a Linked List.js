/*
 * @lc app=leetcode id=1521 lang=javascript
You are given the head of a linked list, and an integer k.

Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

*/

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
// swapping the whole node
var swapNodes = function (head, k) {
  let [swap1Prev, swap2Prev, slow] = [null, null, null];
  let dummy = new ListNode(0, head);
  while (head !== null) {
    if (k === 2) {
      swap1Prev = head;
    }
    if (k === 0) {
      slow = dummy.next;
      k = null;
    }
    if (head.next === null) {
      swap2Prev = slow;
    }
    if (slow === null) {
      k--;
    } else {
      slow = slow.next;
    }
    head = head.next;
  }
  // 2 corner cases: k === 1 and List length === 1
  swap1Prev = swap1Prev || dummy;
  swap2Prev = swap2Prev || dummy;

  let [tmp1, tmp2] = [swap1Prev.next, swap2Prev.next];
  swap1Prev.next = swap2Prev.next;
  swap2Prev.next = tmp1;
  let tmp = tmp1.next;
  tmp1.next = tmp2.next;
  tmp2.next = tmp;
  return dummy.next;
};

// only swapping the value:
var swapNodes = function (head, k) {
  let [dummy, swap1Prev, slow] = [new ListNode(0, head), new ListNode(), null];
  while (head !== null) {
    if (k === 1) {
      swap1Prev.next = head;
      slow = dummy.next;
    }
    if (head.next === null) {
      let tmp = slow.val;
      slow.val = swap1Prev.next.val;
      swap1Prev.next.val = tmp;
    }
    if (slow) {
      slow = slow.next;
    }
    k--;
    head = head.next;
  }
  return dummy.next;
};
// @lc code=end
