/*
 * @lc app=leetcode id=224 lang=javascript
 *
 * [224] Basic Calculator
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
// var withoutParenthesis = (s) => {
//   const isDigit = (char) => char >= "0" && char <= "9";
//   let [expArr, curNum] = [[], 0];
//   for (let i = 0; i < s.length; i++) {
//     if (isDigit(s[i])) {
//       curNum = curNum * 10 + parseInt(s[i]);
//       if (i === s.length - 1) expArr.push(curNum);
//     } else if (s[i] !== " ") {
//       expArr.push(curNum, s[i]);
//       curNum = 0;
//     }
//   }
//   console.log(expArr);
// };
var calculate = function (s) {
  let stack = [];
  const isDigit = (item) => !isNaN(item);
  //   parseInt(char) !== NaN;
  const getExpRes = (arr) => {
    let [curRes, curSign] = [0, 1];
    for (item of arr) {
      if (item === "+") {
        curSign = 1;
      } else if (item === "-") {
        curSign = -1;
      } else {
        curRes += curSign * item;
        curSign = 1;
      }
    }
    return curRes;
  };
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === " ") continue;
    if (s[i] === "(") {
      let curExpArr = [];
      let curNum = 0;
      while (stack.length > 0) {
        if (isDigit(stack[stack.length - 1])) {
          curNum = curNum * 10 + parseInt(stack.pop());
        } else if (stack[stack.length - 1] === ")") {
          if (curNum !== 0) {
            curExpArr.push(curNum);
          }
          stack.pop();
          break;
        } else {
          if (curNum !== 0) {
            curExpArr.push(curNum);
            curNum = 0;
          }
          curExpArr.push(stack.pop());
        }
      }
      stack.push(getExpRes(curExpArr));
    } else {
      stack.push(s[i]);
    }
  }
  let curExpArr = [];
  let curNum = 0;
  while (stack.length > 0) {
    if (stack.length === 1) {
      if (isDigit(stack[0])) {
        curNum = curNum * 10 + parseInt(stack.pop());
      }
      if (curNum !== 0) {
        curExpArr.push(curNum);
      }
    } else if (isDigit(stack[stack.length - 1])) {
      curNum = curNum * 10 + parseInt(stack.pop());
    } else {
      if (curNum !== 0) {
        curExpArr.push(curNum);
        curNum = 0;
      }
      curExpArr.push(stack.pop());
    }
  }
  return getExpRes(curExpArr);
};
// @lc code=end
