/*
 * @lc app=leetcode id=160 lang=javascript
 *
 * [160] Intersection of Two Linked Lists
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let lenA = (lenB = 0);
  let nodeA = headA,
    nodeB = headB;
  while (nodeA !== null || nodeB !== null) {
    if (nodeA) {
      lenA++;
      nodeA = nodeA.next;
    }
    if (nodeB) {
      lenB++;
      nodeB = nodeB.next;
    }
  }
  const helper = (long, short, diff) => {
    while (long !== short) {
      if (diff > 0) {
        diff--;
        long = long.next;
      } else {
        long = long.next;
        short = short.next;
      }
    }
    return long;
  };
  if (lenA > lenB) {
    return helper(headA, headB, lenA - lenB);
  } else {
    return helper(headB, headA, lenB - lenA);
  }
};
// @lc code=end
