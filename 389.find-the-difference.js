/*
 * @lc app=leetcode id=389 lang=javascript
 *
 * [389] Find the Difference
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  let [sHash, tHash, sLen] = [{}, {}, s.length];
  for (let i = 0; i < sLen; i++) {
    if (!sHash[s[i]]) {
      sHash[s[i]] = 1;
    } else {
      sHash[s[i]]++;
    }
    if (!tHash[t[i]]) {
      tHash[t[i]] = 1;
    } else {
      tHash[t[i]]++;
    }
  }
  if (!tHash[t[sLen]]) tHash[t[sLen]] = 1;
  else tHash[t[sLen]]++;
  for (let j = 0; j < Object.keys(tHash).length; j++) {
    let key = Object.keys(tHash)[j];
    if (!sHash[key] || tHash[key] > sHash[key]) return key;
  }
};
/****** 不需要两个hashmap *****/
var findTheDifference = function (s, t) {
  let [sHash, sLen] = [{}, s.length];
  for (let i = 0; i < sLen; i++) {
    if (!sHash[s[i]]) {
      sHash[s[i]] = 1;
    } else {
      sHash[s[i]]++;
    }
  }
  for (let i = 0; i <= sLen; i++) {
    if (!sHash[t[i]]) {
      return t[i];
    } else {
      sHash[t[i]]--;
    }
  }
};
/******* 异或运算 ******/
var findTheDifference = function (s, t) {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    res ^= s.charCodeAt(i);
  }
  for (let i = 0; i < t.length; i++) {
    res ^= t.charCodeAt(i);
  }
  return String.fromCharCode(res);
};
// @lc code=end
