/*Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Implement the MovingAverage class:

MovingAverage(int size) Initializes the object with the size of the window size.
double next(int val) Returns the moving average of the last size values of the stream.
 * Initialize your data structure here.
 * @param {number} size
 */
var MovingAverage = function (size) {
  this.queue = [];
  this.size = size;
  this.average = 0;
};

/**
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function (val) {
  if (this.queue.length < this.size) {
    this.average =
      (val + this.average * this.queue.length) / (this.queue.length + 1);
    this.queue.push(val);
  } else {
    this.average =
      (val + this.average * this.size - this.queue.shift()) / this.size;
    this.queue.push(val);
  }
  return this.average;
};

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
