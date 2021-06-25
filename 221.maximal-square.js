/*
 * @lc app=leetcode id=221 lang=javascript
 *
 * [221] Maximal Square
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
// 要不是知道题目类别是二维DP我可能还真的解不出来。我顺着二维DP的思路去想，想到了创建一个等size的DP array（如果没要求的话in-place去做也行），但不知道里面要存什么。通过自己在草稿纸上算一些简单的例子，我找到了一些规律，我们可以在dp array里面存“以当前位置为右下角的square的边长”，而且进一步发现，这个值可以通过求“上，左，左上”三个位置中最小值再加一得到，这样我们的DP逻辑就完善了。要注意的是dp的初始条件或边界条件，这个问题中第一行和第一列我们需要skip掉；同时注意输入的element实际上是字符，所以如果要in-place保存计算后的值尽量也是字符吧。
var maximalSquare = function (matrix) {
  let [m, n] = [matrix.length, matrix[0].length];
  let longestSquareLength = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] > 0 && i > 0 && j > 0 && matrix[i - 1][j - 1] > 0) {
        matrix[i][j] =
          Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]) +
          1 +
          "";
      }
      longestSquareLength = Math.max(longestSquareLength, matrix[i][j]);
    }
  }
  return longestSquareLength ** 2;
};

// @lc code=end
