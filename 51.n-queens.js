/*
 * @lc app=leetcode id=51 lang=javascript
 *
 * [51] N-Queens
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let tmpRes = [];
  const helper = (row, col, colSet, diagSet, antiDiagSet) => {
    colSet.add(col);
    diagSet.add(row - col);
    antiDiagSet.add(row + col);
    if (row === n - 1) {
      tmpRes.push([...colSet]);
    }
    for (let j = 0; j < n; j++) {
      let nextRow = row + 1;
      if (
        !colSet.has(j) &&
        !diagSet.has(nextRow - j) &&
        !antiDiagSet.has(nextRow + j)
      ) {
        helper(
          nextRow,
          j,
          new Set([...colSet]), // 面试时就是这里没有新建Set导致代码输出错误
          new Set([...diagSet]),
          new Set([...antiDiagSet])
        );
      }
    }
  };
  for (let i = 0; i < n; i++) {
    helper(0, i, new Set(), new Set(), new Set());
  }
  return tmpRes.map((element) =>
    element.map((col) => {
      let arr = Array(n).fill(".");
      arr[col] = "Q";
      return arr.join("");
    })
  );
};
// write in the solution's way: backtracking。
var solveNQueens = function (n) {
  let tmpRes = [];
  const backtrack = (row, colSet, diagSet, antiDiagSet) => {
    for (let col = 0; col < n; col++) {
      if (
        !colSet.has(col) &&
        !diagSet.has(row - col) &&
        !antiDiagSet.has(row + col)
      ) {
        colSet.add(col);
        diagSet.add(row - col);
        antiDiagSet.add(row + col);
        if (row === n - 1) {
          tmpRes.push([...colSet]);
        } else {
          backtrack(row + 1, colSet, diagSet, antiDiagSet);
        }
        colSet.delete(col);
        diagSet.delete(row - col);
        antiDiagSet.delete(row + col); //这样不需要每次都新建Set，因为同一层前面的col添加到Set里面的内容在那一层结束时已经被删除了
      }
    }
  };
  backtrack(0, new Set(), new Set(), new Set());
  return tmpRes.map((element) =>
    element.map((col) => {
      let arr = Array(n).fill(".");
      arr[col] = "Q";
      return arr.join("");
    })
  );
};
// @lc code=end
