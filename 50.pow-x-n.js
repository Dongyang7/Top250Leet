/*
 * @lc app=leetcode id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// TLE, On is not good enough
var myPow = function (x, n) {
  let res = 1;
  if (n > 0) {
    for (let i = 0; i < n; i++) {
      res *= x;
    }
  } else if (n < 0) {
    for (let i = 0; i < -n; i++) {
      res *= x;
    }
    res = 1 / res;
  }
  return res;
};
// logN is better, 对于一个巨大的n，我们可以先算它的一半，然后让这个结果平方相乘，逐层将n除到1为止。
var myPow = function (x, n) {
  const recur = (pow) => {
    if (pow === 1) return x;
    let nextRes = recur(Math.floor(pow / 2));
    return nextRes * nextRes * (pow % 2 === 0 ? 1 : x);
  };
  if (n > 0) {
    return recur(n);
  } else if (n < 0) {
    let res = recur(-n);
    return 1 / res;
  }
  return 1;
};
// iteration的版本，涉及到位运算。We can see that every time we encounter a 1 in the binary representation of N, we need to multiply the answer with x^(2^i) where i is the ith bit of the exponent
var myPow = function (x, n) {
  let [absN, res, curXPow] = [Math.abs(n), 1, n >= 0 ? x : 1 / x];
  while (absN > 0) {
    // 虽然absN是在减少的，但我们实际上是从二进制的末尾开始计算
    if (absN & 1) res *= curXPow; // 判断当前absN的二进制末尾数字是否为1
    absN >>= 1; // bitwise implementation for Math.floor(absN/2), easy!
    curXPow *= curXPow; // 表示在当前位置absN二进制的1代表的数字是多少，如果curXPow是x^(2^i-1)，下一个curXPow就是x^(2^i)
  }
  return res;
};
// @lc code=end
