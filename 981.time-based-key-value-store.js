/*
 * @lc app=leetcode id=981 lang=javascript
 *
 * [981] Time Based Key-Value Store
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
var TimeMap = function () {
  this.hashMap = {};
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  if (this.hashMap[key]) {
    this.hashMap[key].push({ value, timestamp });
  } else {
    this.hashMap[key] = [{ value, timestamp }];
  }
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  if (!this.hashMap[key]) return "";
  let curArr = this.hashMap[key];
  let [start, end] = [0, curArr.length - 1];
  while (start + 1 < end) {
    let mid = Math.floor((start + end) / 2);
    if (curArr[mid].timestamp < timestamp) start = mid;
    else end = mid;
  }
  if (curArr[end].timestamp <= timestamp) return curArr[end].value;
  else if (curArr[start].timestamp <= timestamp) return curArr[start].value;
  else return "";
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
// @lc code=end
