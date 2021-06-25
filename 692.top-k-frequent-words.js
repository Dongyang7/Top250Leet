/*
 * @lc app=leetcode id=692 lang=javascript
 *
 * [692] Top K Frequent Words
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
// naive hash map sorting
var topKFrequent = function (words, k) {
  const freq = new Map();
  for (let word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }
  let wordList = [...freq.keys()];
  console.log(freq, wordList);
  wordList.sort((a, b) => {
    if (freq.get(a) === freq.get(b)) {
      if (a < b) {
        return -1;
      } else return 1;
    }
    return freq.get(b) - freq.get(a);
  });
  return wordList.slice(0, k);
};
// bucket?
var topKFrequent = function (words, k) {
  const freq = new Map();
  for (let word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }
  const bucket = [];
  const res = [];
  for (let [key, value] of freq) {
    bucket[value] = (bucket[value] || []).push(key);
  }
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) {
      if (bucket[i].length > 1) {
        bucket[i].sort();
      }
      res.push(...bucket[i]);
      if (res.length >= k) break;
    }
  }
  return res.slice(0, k);
};
// @lc code=end
