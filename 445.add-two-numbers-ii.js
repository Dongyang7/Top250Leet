/*
 * @lc app=leetcode id=445 lang=javascript
 *
 * [445] Add Two Numbers II
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
  const [stack1, stack2] = [[], []];
  while (l1 || l2) {
    if (l1) {
      stack1.push(l1);
      l1 = l1.next;
    }
    if (l2) {
      stack2.push(l2);
      l2 = l2.next;
    }
  }
  let [nextNode, addOn] = [null, 0];
  while (stack1.length > 0 || stack2.length > 0) {
    let curNode = new ListNode(0, nextNode);
    let sum =
      addOn +
      (stack1.pop() || { val: 0 }).val +
      (stack2.pop() || { val: 0 }).val;
    curNode.val = sum % 10;
    addOn = Math.floor(sum / 10);
    nextNode = curNode;
  }
  return addOn > 0 ? new ListNode(1, nextNode) : nextNode;
};
// get the number，对大数字无法使用
var addTwoNumbers = function (l1, l2) {
  let [n1, n2] = [0, 0];
  while (l1 || l2) {
    if (l1) {
      n1 = n1 * 10 + l1.val;
      l1 = l1.next;
    }
    if (l2) {
      n2 = n2 * 10 + l2.val;
      l2 = l2.next;
    }
  }
  let sum = n1 + n2;
  let nextNode = null;
  while (sum > 0) {
    let curNode = new ListNode(sum % 10, nextNode);
    sum = Math.floor(sum / 10);
    nextNode = curNode;
  }
  return nextNode;
};
// reverse the linked list and solve it

// no input reverse no stack no number transform;
// don't calculate the carry, generate the output list reversely, reverse it later
// 我们只有从个位开始算carry才能够保证最后结果的正确性，因此generate出来的这个list的head一定是个数位，也就是reverse的。
var addTwoNumbers = function (l1, l2) {
  let [nextNode, dummyL1, dummyL2] = [null, l1, l2];
  let len1 = (len2 = 0);
  while (l1 || l2) {
    if (l1) {
      len1++;
      l1 = l1.next;
    }
    if (l2) {
      len2++;
      l2 = l2.next;
    }
  }
  while (dummyL1 || dummyL2) {
    let curNode;
    if (len1 > len2) {
      curNode = new ListNode(dummyL1.val, nextNode);
      len1--;
      dummyL1 = dummyL1.next;
    } else if (len1 < len2) {
      curNode = new ListNode(dummyL2.val, nextNode);
      len2--;
      dummyL2 = dummyL2.next;
    } else {
      curNode = new ListNode(dummyL1.val + dummyL2.val, nextNode);
      len1--;
      len2--;
      dummyL1 = dummyL1.next;
      dummyL2 = dummyL2.next;
    }
    nextNode = curNode;
  }
  let head = nextNode;
  let prevNode = null;
  while (head) {
    if (head.val > 9) {
      head.val %= 10;
      if (head.next) {
        head.next.val += 1;
      } else {
        head.next = new ListNode(1, null);
      }
    }
    [head.next, prevNode, head] = [prevNode, head, head.next]; // 利用destruction交换value时要注意，等号左边的值，最左边的会被最先赋值，所以要注意，这里的head一定要出现在head.next后面。
  }
  return prevNode;
};
// @lc code=end
