/*
 * @lc app=leetcode id=295 lang=javascript
 *
 * [295] Find Median from Data Stream
 */

// @lc code=start
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

/**
 * initialize your data structure here.
 */
// 最开始我在想有没有可能用const的空间和时间解决问题，后来发现我们无论如何也要保留所有的数据；仔细研究添加数据的过程后我发现，这个数据结构可以分为三部分：medium，比medium小的，比medium大的。冥冥之中我有种感觉，medium前后的数据结构可以分别用一个PQ，深入思考验证了下，发现的确可以。大体思路就是，对比输入数字和medium，判断应该插入那个PQ，有些时候需要从PQ中poll最大或最小值出来到medium里面。
// The data structure contains 3 parts: the prevPQ, the medium array, and the postPQ.
// this.medium is an array containing 1 or 2 medium value(s), getMedium is just accumulate the array and return the average.
// When adding a new number, compare it with the medium(s) and heap push/poll numbers to/from the heap accordingly. In this approach the max number of Heap operations is 2. Thus 2*log(n) time complexity
const MAX_NUM = 50000;
var MedianFinder = function () {
  this.prevPQ = new MinHeap(MAX_NUM, (a, b) => a - b);
  this.medium = [];
  this.postPQ = new MinHeap(MAX_NUM);
  this.isOdd = true;
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (this.medium.length === 0) {
    this.medium.push(num);
  } else if (this.isOdd) {
    if (num <= this.medium[0]) {
      this.prevPQ.add(num);
      this.postPQ.add(this.medium.pop());
    } else if (num >= this.medium[1]) {
      this.postPQ.add(num);
      this.prevPQ.add(this.medium.shift());
    } else {
      this.prevPQ.add(this.medium.shift());
      this.postPQ.add(this.medium.pop());
      this.medium.push(num);
    }
  } else {
    if (num <= this.medium[0]) {
      this.prevPQ.add(num);
      this.medium.unshift(this.prevPQ.poll());
    } else {
      this.postPQ.add(num);
      this.medium.push(this.postPQ.poll());
    }
  }
  this.isOdd = !this.isOdd;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  return this.medium.reduce((acc, cur) => acc + cur, 0) / this.medium.length;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end
