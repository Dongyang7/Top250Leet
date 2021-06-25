/**
Given an array of strings wordsDict and two strings that already exist in the array word1 and word2, return the shortest distance between these two words in the list.

Note that word1 and word2 may be the same. It is guaranteed that they represent two individual words in the list.
 */
var shortestWordDistance = function (wordsDict, word1, word2) {
  for (let i = 0; i < wordsDict.length; i++) {
    let [curWord, idx, res] = [wordsDict[i], -1, Number.MAX_SAFE_INTEGER];
    if (curWord === word1 && curWord === word2) {
      if (idx === -1) idx = i;
      else {
        res = Math.min(i - idx, res);
        idx = i;
      }
    } else {
      if (curWord === word1) {
        if (idx > -1 && wordsDict[idx] === word2) {
          res = Math.min(i - idx, res);
        }
        idx = i;
      }
      if (curWord === word2) {
        if (idx > -1 && wordsDict[idx] === word1) {
          res = Math.min(i - idx, res);
        }
        idx = i;
      }
    }
  }
  return res;
};
