/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
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
