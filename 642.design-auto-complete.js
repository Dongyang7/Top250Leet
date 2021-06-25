/**
 * @param {string[]} sentences
 * @param {number[]} times
 */
var TrieNode = function (char) {
  this.char = char;
  this.children = {};
  this.isEnd = false;
};
var AutocompleteSystem = function (sentences, times) {
  this.head = new TrieNode(null);
  this.curInput = "";
  this.freq = {};
  this.curNode = this.head;
  for (let i = 0; i < sentences.length; i++) {
    this.insert(sentences[i], this.head);
    this.freq[sentences[i]] = times[i];
  }
};

// pass in head so that this.head won't change
AutocompleteSystem.prototype.insert = function (s, head) {
  let i = 0;
  while (i < s.length) {
    if (!head.children[s[i]]) {
      head.children[s[i]] = new TrieNode(s[i]);
    }
    head = head.children[s[i]];
    if (i === s.length - 1) head.isEnd = true;
    i++;
  }
};
AutocompleteSystem.prototype.search = function (c, node) {
  let res = [];
  const helper = (n, str) => {
    if (n.isEnd) res.push(str);
    let nextLevel = n.children;
    for (let key in nextLevel) {
      helper(nextLevel[key], str + key);
    }
  };
  if (!node.children[c]) {
    node.children[c] = new TrieNode(c);
  } else {
    helper(node.children[c], this.curInput);
  }
  this.curNode = node.children[c];
  return res;
};
/**
 * @param {character} c
 * @return {string[]}
 */
AutocompleteSystem.prototype.input = function (c) {
  if (c === "#") {
    this.freq[this.curInput] = (this.freq[this.curInput] || 0) + 1;
    this.curNode.isEnd = true;
    this.curNode = this.head;
    this.curInput = "";
    return [];
  } else {
    this.curInput += c;
    let allRes = this.search(c, this.curNode);
    return allRes
      .sort((a, b) => {
        if (this.freq[a] === this.freq[b]) {
          return a < b ? -1 : 1;
        } else {
          return this.freq[b] - this.freq[a];
        }
      })
      .slice(0, 3);
  }
};

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */

// use min heap to build priority queue
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
var TrieNode = function (char) {
  this.char = char;
  this.children = {};
  this.isEnd = false;
};
var AutocompleteSystem = function (sentences, times) {
  this.head = new TrieNode(null);
  this.curInput = "";
  this.freq = {};
  this.curNode = this.head;
  this.pq = new MinHeap(3, (a, b) => {
    if (a.freq === b.freq) {
      return a.str > b.str ? 1 : -1;
    } else {
      return b.freq - a.freq;
    }
  });
  for (let i = 0; i < sentences.length; i++) {
    this.insert(sentences[i], this.head);
    this.freq[sentences[i]] = times[i];
  }
};
AutocompleteSystem.prototype.insert = function (s, head) {
  let i = 0;
  while (i < s.length) {
    if (!head.children[s[i]]) {
      head.children[s[i]] = new TrieNode(s[i]);
    }
    head = head.children[s[i]];
    if (i === s.length - 1) head.isEnd = true;
    i++;
  }
};
AutocompleteSystem.prototype.search = function (c, node) {
  let res = [];
  const helper = (n, str) => {
    if (n.isEnd) res.push(str);
    let nextLevel = n.children;
    for (let key in nextLevel) {
      helper(nextLevel[key], str + key);
    }
  };
  if (!node.children[c]) {
    node.children[c] = new TrieNode(c);
  } else {
    helper(node.children[c], this.curInput);
  }
  this.curNode = node.children[c];
  return res;
};
AutocompleteSystem.prototype.input = function (c) {
  if (c === "#") {
    this.freq[this.curInput] = (this.freq[this.curInput] || 0) + 1;
    this.curNode.isEnd = true;
    this.curNode = this.head;
    this.curInput = "";
    return [];
  } else {
    this.curInput += c;
    for (let str of this.search(c, this.curNode)) {
      this.pq.add({ str, freq: this.freq[str] });
    }
    let k = Math.min(3, this.pq.getHeap().length);
    let resArr = Array(k);
    while (k > 0) {
      resArr[--k] = this.pq.poll().str;
    }
    return resArr;
  }
};
