/*
 * @lc app=leetcode id=1154 lang=javascript
 *
 * 1153. String Transforms Into Another String
 */

// @lc code=start
/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
var canConvert = function (str1, str2) {
  if (str1 === str2) return true;
  let charIdxMap = {};
  let str2CharSet = new Set();
  for (let i = 0; i < str1.length; i++) {
    let char = str1[i];
    if (charIdxMap[char]) {
      charIdxMap[char].push(i);
    } else {
      charIdxMap[char] = [i];
    }
    str2CharSet.add(str2[i]);
  }
  if (Object.keys(charIdxMap).length === 26 && str2CharSet.size === 26) {
    return false;
  }
  for (let char in charIdxMap) {
    let idxArr = charIdxMap[char];
    let sameChar = str2[idxArr[0]];
    for (let idx of idxArr) {
      if (str2[idx] !== sameChar) {
        return false;
      }
    }
  }
  return true;
};
// @lc code=end
