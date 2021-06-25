/*
 * @lc app=leetcode id=1472 lang=javascript
 *
 * [1472] Design Browser History
 */

// @lc code=start
/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
  this.history = [homepage];
  this.curPos = 0;
};

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function (url) {
  this.history.splice(this.curPos + 1);
  this.history.push(url);
  this.curPos++;
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function (steps) {
  this.curPos = Math.max(this.curPos - steps, 0);
  return this.history[this.curPos];
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function (steps) {
  this.curPos = Math.min(this.curPos + steps, this.history.length - 1);
  return this.history[this.curPos];
};

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */
// @lc code=end
