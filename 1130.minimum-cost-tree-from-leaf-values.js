/*
 * @lc app=leetcode id=1130 lang=javascript
 *
 * [1130] Minimum Cost Tree From Leaf Values
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
// Time is O(N^3), space is O(N^2), i guess? Call stacks, need to go through every possible range in arr, which is O(N^2), and inside each call we need to check for the max leaf value, it's a O(N), so time is O(N^3); For space we have the memo and call stack, both are O(N^2)
var mctFromLeafValues = function (arr) {
  let n = arr.length;
  const memo = {};
  const helper = (i, j) => {
    if (memo[i + "-" + j]) return memo[i + "-" + j];
    let minSum = Number.MAX_SAFE_INTEGER;
    let max = Math.max(...arr.slice(i, j + 1));
    if (j === i + 1) {
      minSum = arr[i] * arr[j];
    } else if (j === i) {
      minSum = 0;
    } else {
      for (let m = i; m < j; m++) {
        let leftRes, rightRes;
        if (memo[i + "-" + m]) {
          leftRes = memo[i + "-" + m];
        } else {
          leftRes = helper(i, m);
        }
        if (memo[m + 1 + "-" + j]) {
          rightRes = memo[m + 1 + "-" + j];
        } else {
          rightRes = helper(m + 1, j);
        }
        minSum = Math.min(
          minSum,
          leftRes.minSum + rightRes.minSum + leftRes.maxLeaf * rightRes.maxLeaf
        );
      }
    }
    let res = { minSum, maxLeaf: max };
    memo[i + "-" + j] = res;
    return res;
  };
  return helper(0, n - 1).minSum;
};
// crazy smart DP solution
var mctFromLeafValues = function (arr) {
  const stack = [Number.MAX_SAFE_INTEGER];
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    while (arr[i] >= stack[stack.length - 1]) {
      //这里while循环保证了stack从上到下是递减的
      let mid = stack.pop();
      res += Math.min(stack[stack.length - 1], arr[i]) * mid; //对于第一个数字来说，它要么被后面第一个比他大的数字消耗掉，要么他就是最大的；对于中间的某个数字来说，它要么是最大的会留到stack最底下，把倒数第二大的数字消耗掉；要么不是最大的，那么它必然会被前面或后面第一个更大的数字消耗掉；至于这个数字和第一个更大数字区间内的其他数字，他们肯定都比这两个小，所以在循环时肯定也被消耗掉了
    }
    stack.push(arr[i]);
  }
  while (stack.length > 2) {
    res += stack.pop() * stack[stack.length - 1]; //do pop() first!
  }
  return res;
};
// @lc code=end
