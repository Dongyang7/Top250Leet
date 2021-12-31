/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  var numLetterMap = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };
  let res = [];
  const backtrack = (idx, curLetterArr) => {
    if (idx === digits.length) {
      if (curLetterArr.length > 0) res.push(curLetterArr.join(""));
    } else {
      for (let curLetter of numLetterMap[digits[idx]]) {
        curLetterArr.push(curLetter);
        backtrack(idx + 1, curLetterArr);
        curLetterArr.pop();
      }
    }
  };
  backtrack(0, []);
  return res;
};
// @lc code=end
