/*
 * @lc app=leetcode id=23 lang=javascript
 *
 * [23] Merge k Sorted Lists
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// naive sorting O(N) + O(NlogN)time and O(N) space
var mergeKLists = function (lists) {
  let listArr = [];
  for (let node of lists) {
    while (node) {
      listArr.push(node);
      node = node.next;
    }
  }
  listArr.sort((a, b) => a.val - b.val);
  for (let i = 0; i < listArr.length; i++) {
    if (i === listArr.length - 1) {
      listArr[i].next = null;
    } else {
      listArr[i].next = listArr[i + 1];
    }
  }
  return listArr[0] || null;
};

//########################### Heap solution
var MinHeap = function (capacity, compareFn = (a, b) => b - a) {
  this.heap = [];
  this.capacity = capacity;
  this.compareFn = compareFn;
};
MinHeap.prototype.add = function (element) {
  if (this.heap.length < this.capacity) {
    this.heap.push(element);
    this.heapifyUp();
  } else {
    if (this.compareFn(this.heap[0], element) > 0) {
      this.heap[0] = element;
      this.heapifyDown();
    }
  }
};
MinHeap.prototype.getHeap = function () {
  return this.heap;
};
MinHeap.prototype.heapifyUp = function () {
  let curIdx = this.heap.length - 1;
  while (
    curIdx > 0 &&
    this.compareFn(this.heap[curIdx], this.heap[Math.floor((curIdx - 1) / 2)]) >
      0
  ) {
    [this.heap[curIdx], this.heap[Math.floor((curIdx - 1) / 2)]] = [
      this.heap[Math.floor((curIdx - 1) / 2)],
      this.heap[curIdx],
    ];
    curIdx = Math.floor((curIdx - 1) / 2);
  }
};
MinHeap.prototype.heapifyDown = function () {
  let curIdx = 0;
  while (
    (curIdx * 2 + 1 < this.heap.length &&
      this.compareFn(this.heap[curIdx], this.heap[curIdx * 2 + 1]) < 0) ||
    (curIdx * 2 + 2 < this.heap.length &&
      this.compareFn(this.heap[curIdx], this.heap[curIdx * 2 + 2]) < 0)
  ) {
    if (
      curIdx * 2 + 2 < this.heap.length &&
      this.compareFn(this.heap[curIdx * 2 + 1], this.heap[curIdx * 2 + 2]) < 0
    ) {
      [this.heap[curIdx], this.heap[curIdx * 2 + 2]] = [
        this.heap[curIdx * 2 + 2],
        this.heap[curIdx],
      ];
      curIdx = curIdx * 2 + 2;
    } else {
      [this.heap[curIdx], this.heap[curIdx * 2 + 1]] = [
        this.heap[curIdx * 2 + 1],
        this.heap[curIdx],
      ];
      curIdx = curIdx * 2 + 1;
    }
  }
};
MinHeap.prototype.poll = function () {
  [this.heap[0], this.heap[this.heap.length - 1]] = [
    this.heap[this.heap.length - 1],
    this.heap[0],
  ];
  let removedHead = this.heap.pop();
  this.heapifyDown();
  return removedHead;
};
MinHeap.prototype.peek = function () {
  return this.heap[0];
};

var mergeKLists = function (lists) {
  const pq = new MinHeap(lists.length, (a, b) => b.val - a.val);
  for (let node of lists) {
    if (node) {
      pq.add(node);
    }
  }
  let head = (res = pq.poll());
  while (head) {
    if (head.next) pq.add(head.next);
    head.next = pq.poll() || null;
    head = head.next;
  }
  return res || null;
};
// ############divide and conquer
var mergeKLists = function (lists) {
  let len = lists.length;
  let interval = 1;
  const merge2List = (node1, node2) => {
    if (!node1 || !node2) return node1 || node2;
    let dummy = (head = new ListNode(0, null));
    while (node1 && node2) {
      if (node1.val < node2.val) {
        head.next = node1;
        node1 = node1.next;
      } else {
        head.next = node2;
        node2 = node2.next;
      }
      head = head.next;
    }
    head.next = node1 || node2;
    return dummy.next;
  };
  while (interval < len) {
    for (let i = 0; i < len; i += 2 * interval) {
      lists[i] = merge2List(lists[i], lists[i + interval]);
    }
    interval *= 2;
  }
  return lists[0] || null;
};
// @lc code=end
