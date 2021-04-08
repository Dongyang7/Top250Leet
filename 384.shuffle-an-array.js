/*
 * @lc app=leetcode id=384 lang=javascript
 *
 * [384] Shuffle an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.origin = nums;
};
Solution.prototype.reset = function () {
  return [...this.origin];
};
Solution.prototype.shuffle = function () {
  let random = [];
  let newArr = [...this.origin];
  for (let i = 0; i < this.origin.length; i++) {
    let randomNum = Math.floor(Math.random() * newArr.length);
    random.push(newArr[randomNum]);
    newArr.splice(randomNum, 1);
  }
  return random;
};
/**********  Fisher-Yates Algorithm  **********/
var Solution = function (nums) {
  this.origin = nums;
};
Solution.prototype.reset = function () {
  return [...this.origin];
};
Solution.prototype.shuffle = function () {
  let newArr = [...this.origin];
  for (let i = 0; i < newArr.length; i++) {
    let randomNum = Math.floor(Math.random() * (newArr.length - i)) + i;
    let tmp = newArr[randomNum];
    newArr[randomNum] = newArr[i];
    newArr[i] = tmp;
  }
  return newArr;
};
// @lc code=end
