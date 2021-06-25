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
