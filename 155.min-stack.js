/*
 * @lc app=leetcode id=155 lang=javascript
 *
 * [155] Min Stack
 */

// @lc code=start
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (
    this.minStack.length === 0 ||
    x <= this.minStack[this.minStack.length - 1]
  ) {
    this.minStack.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  let lastElement = this.stack.pop();
  if (lastElement === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};
/******* Method II use a 2D array/stack to store the min as 2nd value ************** */
var MinStack = function () {
  this.stack = [];
};
MinStack.prototype.push = function (x) {
  this.stack.push([
    x,
    this.stack.length === 0
      ? x
      : Math.min(x, this.stack[this.stack.length - 1][1]),
  ]);
};
MinStack.prototype.pop = function () {
  this.stack.pop();
};
MinStack.prototype.top = function () {
  if (this.stack.length > 0) return this.stack[this.stack.length - 1][0];
  else return null;
};
MinStack.prototype.getMin = function () {
  return this.stack[this.stack.length - 1][1];
};
