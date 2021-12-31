/*
 * @lc app=leetcode id=1143 lang=javascript
 *
 * [1143] Longest Common Subsequence
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// recursion, divide into 2 potential subproblems at each step
var longestCommonSubsequence = function (text1, text2) {
  const [len1, len2] = [text1.length, text2.length];
  const memo = Array.from(Array(len1), () => Array(len2));
  const helper = (pos1, pos2) => {
    if (pos1 === text1.length || pos2 === text2.length) return 0;
    if (memo[pos1][pos2]) return memo[pos1][pos2];
    let firstChar = text1[pos1];
    let firstOcc = text2.indexOf(firstChar);
    let isOptimal = 0;
    if (firstOcc > -1) {
      isOptimal = helper(pos1 + 1, firstOcc + 1) + 1;
    }
    let isNotOptimal = helper(pos1 + 1, pos2);
    memo[pos1][pos2] = Math.max(isOptimal, isNotOptimal);
    return memo[pos1][pos2];
  };
  return helper(0, 0);
};
var longestCommonSubsequence = function (text1, text2) {
  const [len1, len2] = [text1.length, text2.length];
  const memo = Array.from(Array(len1), () => Array(len2));
  const helper = (pos1, pos2) => {
    if (pos1 === len1 || pos2 === len2) return 0;
    if (memo[pos1][pos2]) return memo[pos1][pos2];
    let res = 0;
    if (text1[pos1] === text2[pos2]) {
      res = 1 + helper(pos1 + 1, pos2 + 1);
    } else {
      res = Math.max(helper(pos1 + 1, pos2), helper(pos1, pos2 + 1));
    }
    memo[pos1][pos2] = res;
    return res;
  };
  return helper(0, 0);
};
// dp
var longestCommonSubsequence = function (text1, text2) {
  const [len1, len2] = [text1.length, text2.length];
  const dp = Array.from(Array(len1), () => Array(len2));
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      if (i === len1 - 1 && j === len2 - 1) {
        dp[i][j] = text1[i] === text2[j] ? 1 : 0;
      } else if (i === len1 - 1) {
        dp[i][j] = text1[i] === text2[j] ? 1 : dp[i][j + 1];
      } else if (j === len2 - 1) {
        dp[i][j] = text1[i] === text2[j] ? 1 : dp[i + 1][j];
      } else {
        if (text1[i] === text2[j]) {
          dp[i][j] = dp[i + 1][j + 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
        }
      }
    }
  }
  return dp[0][0];
};
// dp with a padding,加了padding就不需要像上面那样写一堆的if来填充边缘的row和col了。感觉dp的问题里面经常会有这种padding，padding就像是最最base的case。
var longestCommonSubsequence = function (text1, text2) {
  const [len1, len2] = [text1.length, text2.length];
  const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }
  return dp[0][0];
};
// dp问题也经常会有这种优化方式，就是能把2D的dp array缩小成一维的；这种都需要仔细观察，我们每次计算只需要当前row和下面row的信息，所以只需要保留这两个row就行。
var longestCommonSubsequence = function (text1, text2) {
  if (text2.length > text1.length) {
    [text2, text1] = [text1, text2]; // make sure text2 is shorter
  }
  const [len1, len2] = [text1.length, text2.length];
  let prev = Array(len2 + 1).fill(0);
  let cur = Array(len2 + 1).fill(0);
  // const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        cur[j] = prev[j + 1] + 1;
      } else {
        cur[j] = Math.max(cur[j + 1], prev[j]);
      }
    }
    [cur, prev] = [prev, cur];
  }
  return prev[0]; // note that the result is in prev array since we swap them
};
// @lc code=end
