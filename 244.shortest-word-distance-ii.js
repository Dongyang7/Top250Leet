/* Design a data structure that will be initialized with a string array, and then it should answer queries of the shortest distance between two different strings from the array.

Implement the WordDistance class:

WordDistance(String[] wordsDict) initializes the object with the strings array wordsDict.
int shortest(String word1, String word2) returns the shortest distance between word1 and word2 in the array wordsDict. */

// straight forward solution
var WordDistance = function (wordsDict) {
  this.wordsDict = wordsDict;
};

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

// use a hashmap to store things
var WordDistance = function (wordsDict) {
  this.hashList = new Map();
  for (let i = 0; i < wordsDict.length; i++) {
    let curWord = wordsDict[i];
    if (this.hashList.has(curWord)) {
      this.hashList.get(curWord).push(i);
    } else {
      this.hashList.set(curWord, [i]);
    }
  }
};

WordDistance.prototype.shortest = function (word1, word2) {
  let [w1PosList, w2PosList, i, j, res] = [
    this.hashList.get(word1),
    this.hashList.get(word2),
    0,
    0,
    Number.MAX_SAFE_INTEGER,
  ];
  while (i < w1PosList.length && j < w2PosList.length) {
    if (w1PosList[i] < w2PosList[j]) {
      res = Math.min(res, w2PosList[j] - w1PosList[i]);
      i++;
    } else {
      res = Math.min(res, w1PosList[i] - w2PosList[j]);
      j++;
    }
  }
  return res;
};

/**
 * Your WordDistance object will be instantiated and called as such:
 * var obj = new WordDistance(wordsDict)
 * var param_1 = obj.shortest(word1,word2)
 */
