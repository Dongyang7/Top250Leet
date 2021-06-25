/*
 * @lc app=leetcode id=1209 lang=javascript
 *
 * [1209] Remove All Adjacent Duplicates in String II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// time limit exceeded, O(n^2/k)
var removeDuplicates = function (s, k) {
  let str = s;
  let canContinue = true;
  while (canContinue) {
    let deleteStart = 0;
    canContinue = false;
    for (let i = 1; i < str.length; i++) {
      if (str[i] === str[deleteStart]) {
        if (i - deleteStart + 1 === k) {
          str = str.slice(0, deleteStart) + str.slice(i + 1);
          canContinue = true;
          break;
        }
      } else {
        deleteStart = i;
      }
    }
  }
  return str;
};
// 稍微优化了但好像又没怎么优化
var removeDuplicates = function (s, k) {
  let str = s;
  let canContinue = true;
  while (canContinue) {
    let [deleteStart, pieceStart, strPieces] = [0, 0, []];
    for (let i = 1; i < str.length; i++) {
      if (str[i] === str[deleteStart]) {
        if (i - deleteStart + 1 === k) {
          strPieces.push(str.slice(pieceStart, deleteStart));
          pieceStart = deleteStart = ++i;
        }
      } else {
        deleteStart = i;
      }
    }
    canContinue = strPieces.length > 0;
    str = canContinue ? strPieces.join("") : str;
  }
  return str;
};
// stack
var removeDuplicates = function (s, k) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    let stackLen = stack.length;
    if (stackLen > 0 && stack[stackLen - 1].char === s[i]) {
      if (++stack[stackLen - 1].count === k) {
        stack.pop();
      }
    } else {
      stack.push({ char: s[i], count: 1 });
    }
  }
  return stack.reduce(
    (acc, cur) => acc + Array(cur.count).fill(cur.char).join(""),
    ""
  );
};
// stack v2
var removeDuplicates = function (s, k) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    let stackLen = stack.length;
    if (stackLen > 0 && stack[stackLen - 1][0] === s[i]) {
      stack[stackLen - 1] += s[i];
      if (stack[stackLen - 1].length === k) {
        stack.pop();
      }
    } else {
      stack.push(s[i]);
    }
  }
  return stack.reduce((acc, cur) => acc + cur, "");
};
// @lc code=end
