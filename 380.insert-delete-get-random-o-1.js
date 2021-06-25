/*
 * @lc app=leetcode id=380 lang=javascript
 *
 * [380] Insert Delete GetRandom O(1)
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
// getRandom肯定是需要一个array的，但从array里面删除是On，除非删除的是最后一项。同时array里面的顺序没有关系，因此我们可以每次都把要删除的swap到最后一项。
var RandomizedSet = function () {
  this.hashMap = new Map();
  this.valArr = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (!this.hashMap.has(val)) {
    this.hashMap.set(val, this.valArr.length);
    this.valArr.push(val);
    return true;
  } else {
    return false;
  }
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (this.hashMap.has(val)) {
    if (this.hashMap.get(val) < this.valArr.length - 1) {
      let tmp = this.valArr[this.valArr.length - 1];
      [
        this.valArr[this.hashMap.get(val)],
        this.valArr[this.valArr.length - 1],
      ] = [
        this.valArr[this.valArr.length - 1],
        this.valArr[this.hashMap.get(val)],
      ];
      this.hashMap.set(tmp, this.hashMap.get(val));
    }
    this.valArr.pop();
    this.hashMap.delete(val);
    return true;
  } else {
    return false;
  }
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  return this.valArr[Math.floor(this.valArr.length * Math.random())];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end
