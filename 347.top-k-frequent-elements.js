/*
 * @lc app=leetcode id=347 lang=javascript
 *
 * [347] Top K Frequent Elements
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// naive hash map sort version
var topKFrequent = function (nums, k) {
  const freq = {};
  for (let num of nums) {
    freq[num] = (freq[num] || 0) + 1;
  }
  const numList = Object.keys(freq);
  numList.sort((a, b) => {
    return freq[b] - freq[a];
  });
  return numList.slice(0, k);
};
// bucket sort
var topKFrequent = function (nums, k) {
  const freq = {};
  for (let num of nums) {
    freq[num] = (freq[num] || 0) + 1;
  }
  const bucket = [];
  for (let num in freq) {
    if (bucket[freq[num]]) {
      bucket[freq[num]].push(num);
    } else {
      bucket[freq[num]] = [num];
    }
  }
  const res = [];
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (!bucket[i]) {
      res.push(...bucket[i]);
      if (res.length >= k) break;
    }
  }
  return res.slice(0, k);
};
// min Heap
var topKFrequent = function (nums, k) {
  let frequency = getFrequency(nums);
  let minHeap = new Heap((a, b) => b.freq - a.freq, k);

  Object.keys(frequency).forEach((num) => {
    minHeap.insert({
      num: num,
      freq: frequency[num],
    });
  });

  let result = [];
  for (let i = 1; i <= k; i++) {
    result.push(parseInt(minHeap._heap[i].num, 10));
  }
  return result;
};

function getFrequency(nums) {
  let result = {};
  nums.forEach((num) => {
    result[num] = result[num] ? result[num] + 1 : 1;
  });
  return result;
}

/**
 * It is max heap by default
 * @usage:
 * let maxHeap = new Heap();
 * let maxHeap = new Heap(100, (a, b) => a.value - b.value);
 * let minHeap = new Heap(100, (a, b) => b-a);
 */
class Heap {
  constructor(compareFn = (a, b) => a - b, capacity = Heap.DEFAULT_HEAP_SIZE) {
    this.capacity = capacity;
    this._heap = [];
    if (typeof compareFn === "function") {
      this.compare = compareFn;
    }
  }

  get size() {
    return this._heap.length - 1;
  }

  get rootNode() {
    return this._heap[1] ? this._heap[1] : null;
  }

  set rootNode(node) {
    this._heap[1] = node;
  }

  insert(obj) {
    if (this.rootNode === null) {
      this.rootNode = obj;
      return this;
    }
    if (this.size >= this.capacity) {
      if (this.compare(this.rootNode, obj) > 0) {
        this.rootNode = obj;
        this._down(1);
      }
    } else {
      this._heap.push(obj);
      this._up(this.size);
    }
    return this;
  }

  _down(index) {
    let childIndex = { left: index * 2, right: index * 2 + 1 };
    let biggerChildIndex = null;
    if (childIndex.left > this.size) {
      return;
    }
    if (childIndex.left === this.size) {
      biggerChildIndex = childIndex.left;
    } else {
      biggerChildIndex =
        this.compare(
          this._heap[childIndex.left],
          this._heap[childIndex.right]
        ) > 0
          ? childIndex.left
          : childIndex.right;
    }
    if (this.compare(this._heap[biggerChildIndex], this._heap[index]) > 0) {
      this._swap(index, biggerChildIndex);
      this._down(biggerChildIndex);
    }
  }

  _up(index) {
    let parentIndex = index >= 2 ? Math.floor(index / 2) : 0;
    if (
      parentIndex > 0 &&
      this.compare(this._heap[parentIndex], this._heap[index]) < 0
    ) {
      this._swap(parentIndex, index);
      this._up(parentIndex);
    }
  }

  _swap(index1, index2) {
    [this._heap[index1], this._heap[index2]] = [
      this._heap[index2],
      this._heap[index1],
    ];
  }
}
Heap.DEFAULT_HEAP_SIZE = 1000;
// @lc code=end
