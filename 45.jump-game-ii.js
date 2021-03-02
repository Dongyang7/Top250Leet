/*
 * @lc app=leetcode id=45 lang=javascript
 *
 * [45] Jump Game II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/**第一次完全没看hint和题解独立写出来一道Hard，纪念一下yeah～
 总结：用空间换时间，我们先写出一个最基础的解法，发现它是N^2的复杂度，然后寻找下
 用空间换取时间的可能，一般都是用数组或dict之类的去存储一些数据，然后可以省去一层
 循环的计算
 */
//初版代码，worst case的时间复杂度是n^2
var jump = function (nums) {
  const helper = (len) => {
    let res;
    if (len === 1) return 0;
    if (len === 2) return 1;
    for (let i = 0; i < len; i++) {
      if (nums[i] >= len - i - 1) {
        res = helper(i + 1) + 1;
        break;
      }
    }
    return res;
  };
  return helper(nums.length);
};

/*第二版代码，用了一个obj来存储能够到达某位置key的最小起跳坐标val，这样省去了初始代码
helper函数里面的for循环；但是存在一个问题，M有时会比我们要找的那个len大，无法map*/
var jump = function (nums) {
  if (nums.length < 2) return 0;
  var helperObj = {};
  for (let i = 0; i < nums.length - 1; i++) {
    let val = Math.min(nums[i] + i + 1, nums.length);
    if (helperObj[val] !== undefined) continue;
    else {
      helperObj[val] = i;
    }
  }
  console.log(helperObj);
  const helperFn = (len) => {
    if (len === 1) return 0;
    if (len === 2) return 1;
    return helperFn(helperObj[len] + 1) + 1;
  };
  return helperFn(nums.length);
};
/*第三版，
02.26.2021 原来我这用的就是自下而上的动态规划啊
我们换个角度想，我做一次遍历得到这样一个dict，包含
能够到达数组里各个位置key的最小起跳坐标val，这样就能保证每次helperFn的参数在dict里面
都有的map，别看有两个叠在一起的for，由于里面的for实际上只会运行N次，所以时间复杂度为On */
var jump = function (nums) {
  if (nums.length < 2) return 0;
  var helperObj = {};
  let currentJumpStart = 2;
  for (let i = 0; i < nums.length - 1; i++) {
    let currentJumpEnd = Math.min(nums[i] + i + 1, nums.length);
    for (let j = currentJumpStart; j <= currentJumpEnd; j++) {
      if (helperObj[j] !== undefined) continue;
      helperObj[j] = i;
    }
    currentJumpStart = currentJumpEnd + 1;
  }
  const helperFn = (len) => {
    if (len === 1) return 0;
    if (len === 2) return 1;
    return helperFn(helperObj[len] + 1) + 1;
  };
  return helperFn(nums.length);
};
// @lc code=end

// 4,1,2,1,4
