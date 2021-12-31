/*
 * @lc app=leetcode id=146 lang=javascript
 *
 * [146] LRU Cache
 */

// @lc code=start
/**
 * @param {number} capacity
 */
// The order of keys in Map depends on the insert order, it's sort of a OrderedDict. But this is a hacky way TBH
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.get(key) !== undefined) {
    let value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // console.log(this.map)
  if (this.map.get(key) !== undefined) {
    this.map.delete(key);
  }
  this.map.set(key, value);
  if (this.map.size > this.capacity) {
    this.map.delete(this.map.keys().next().value);
  }
};

// let's create a Double linked list and use it to solve this problem
var DLinkedList = function (key, value, next, prev) {
  this.key = key;
  this.value = value;
  this.next = next;
  this.prev = prev;
};
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
  this.head = new DLinkedList(0, 0, null, null);
  this.tail = new DLinkedList(0, 0, null, null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let curNode = this.map.get(key);
  if (curNode !== undefined) {
    curNode.prev.next = curNode.next;
    curNode.next.prev = curNode.prev;
    let curTop = this.head.next;
    [this.head.next, curNode.next, curNode.prev, curTop.prev] = [
      curNode,
      curTop,
      this.head,
      curNode,
    ];
    return curNode.value;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let curNode = this.map.get(key);
  if (curNode === undefined) {
    curNode = new DLinkedList(key, value, null, null);
  } else {
    curNode.prev.next = curNode.next;
    curNode.next.prev = curNode.prev;
  }
  curNode.value = value;
  let curTop = this.head.next;
  [this.head.next, curNode.next, curNode.prev, curTop.prev] = [
    curNode,
    curTop,
    this.head,
    curNode,
  ];
  this.map.set(key, curNode);
  if (this.map.size > this.capacity) {
    let tobeDelete = this.tail.prev;
    this.map.delete(tobeDelete.key);
    this.tail.prev = tobeDelete.prev;
    tobeDelete.prev.next = this.tail;
  }
};
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// use double linked list, got TLE when use Object.keys, I changed to use this.size then it's good
class DoubleLinkedList {
  constructor(val, prev, next) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.start = new DoubleLinkedList(null, null, null);
  this.end = new DoubleLinkedList(null, this.start, null);
  this.start.next = this.end;
  this.map = {};
  this.size = 0;
};
LRUCache.prototype.get = function (key) {
  let curNode = this.map[key];
  if (curNode) {
    curNode.prev.next = curNode.next;
    curNode.next.prev = curNode.prev;
    curNode.prev = this.end.prev;
    curNode.next = this.end;
    this.end.prev.next = curNode;
    this.end.prev = curNode;
    return curNode.val[1];
  }
  return -1;
};
LRUCache.prototype.put = function (key, value) {
  if (this.map[key]) {
    let curNode = this.map[key];
    curNode.val[1] = value;
    curNode.prev.next = curNode.next;
    curNode.next.prev = curNode.prev;
    curNode.prev = this.end.prev;
    curNode.next = this.end;
    this.end.prev.next = curNode;
    this.end.prev = curNode;
  } else {
    let newNode = new DoubleLinkedList([key, value], this.end.prev, this.end);
    this.end.prev.next = newNode;
    this.end.prev = newNode;
    this.map[key] = newNode;
    this.size++;
    if (this.size > this.capacity) {
      let oldNode = this.start.next;
      oldNode.next.prev = this.start;
      this.start.next = oldNode.next;
      oldNode.next = null;
      oldNode.prev = null;
      delete this.map[oldNode.val[0]];
      this.size--;
    }
  }
};
// @lc code=end
