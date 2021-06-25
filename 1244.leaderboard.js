var Leaderboard = function () {
  this.scoreMap = {};
  this.sortedIds = [];
};

/**
 * @param {number} playerId
 * @param {number} score
 * @return {void}
 */
Leaderboard.prototype.addScore = function (playerId, score) {
  let playerExists = !!this.scoreMap[playerId];
  this.scoreMap[playerId] = (this.scoreMap[playerId] || 0) + score;
  if (!this.sortedIds.length) {
    this.sortedIds.push(playerId);
    return;
  }
  let [curScore, start, end] = [
    this.scoreMap[playerId],
    0,
    playerExists ? this.sortedIds.indexOf(playerId) : this.sortedIds.length - 1,
  ];
  if (playerExists) {
    this.sortedIds.splice(this.sortedIds.indexOf(playerId), 1);
  }
  if (playerId === 2) console.log(start, end, this.sortedIds, this.scoreMap);
  while (start + 1 < end) {
    let mid = Math.floor((start + end) / 2);
    let midScore = this.scoreMap[this.sortedIds[mid]];
    if (curScore >= midScore) {
      end = mid;
    } else {
      start = mid;
    }
  }
  let insertPos;
  if (curScore >= this.scoreMap[this.sortedIds[start]]) {
    insertPos = start;
  } else if (curScore >= this.scoreMap[this.sortedIds[end]]) {
    insertPos = end;
  } else {
    insertPos = end + 1;
  }
  this.sortedIds.splice(insertPos, 0, playerId);
};

/**
 * @param {number} K
 * @return {number}
 */
Leaderboard.prototype.top = function (K) {
  // console.log(this.sortedIds, this.scoreMap);
  return this.sortedIds
    .slice(0, K)
    .reduce((acc, cur) => acc + this.scoreMap[cur], 0);
};

/**
 * @param {number} playerId
 * @return {void}
 */
Leaderboard.prototype.reset = function (playerId) {
  delete this.scoreMap[playerId];
  this.sortedIds.splice(this.sortedIds.indexOf(playerId), 1);
};

/**
 * Your Leaderboard object will be instantiated and called as such:
 * var obj = new Leaderboard()
 * obj.addScore(playerId,score)
 * var param_2 = obj.top(K)
 * obj.reset(playerId)
 */

// use min heap
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
    this.compareFn(this.heap[curIdx], this.heap[Math.floor(curIdx / 2)]) > 0
  ) {
    [this.heap[curIdx], this.heap[Math.floor(curIdx / 2)]] = [
      this.heap[Math.floor(curIdx / 2)],
      this.heap[curIdx],
    ];
    curIdx = Math.floor(curIdx / 2);
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

var Leaderboard = function () {
  this.scoreMap = {};
};
Leaderboard.prototype.addScore = function (playerId, score) {
  this.scoreMap[playerId] = (this.scoreMap[playerId] || 0) + score;
};
Leaderboard.prototype.top = function (K) {
  let pq = new MinHeap(K, (a, b) => b.score - a.score);
  for (let id in this.scoreMap) {
    pq.add({ id, score: this.scoreMap[id] });
  }
  return pq.getHeap().reduce((acc, cur) => acc + cur.score, 0);
};
Leaderboard.prototype.reset = function (playerId) {
  delete this.scoreMap[playerId];
};
