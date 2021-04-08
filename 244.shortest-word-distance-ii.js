/**
 * @param {string[]} wordsDict
 */
var WordDistance = function (wordsDict) {
  this.wordsDict = wordsDict;
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
WordDistance.prototype.shortest = function (word1, word2) {
  let [idx, res] = [-1, Number.MAX_SAFE_INTEGER];
  for (let i = 0; i < this.wordsDict.length; i++) {
    let curWord = this.wordsDict[i];
    if (curWord === word1 || curWord === word2) {
      if (idx > -1 && this.wordsDict[idx] !== curWord) {
        res = Math.min(res, i - idx);
      }
      idx = i;
    }
  }
  return res;
};

/**
 * Your WordDistance object will be instantiated and called as such:
 * var obj = new WordDistance(wordsDict)
 * var param_1 = obj.shortest(word1,word2)
 */
