/* Given an array of strings wordsDict and two different strings that already exist in the array word1 and word2, return the shortest distance between these two words in the list. */

var shortestDistance = function (wordsDict, word1, word2) {
  if (wordsDict.indexOf(word1) === -1 || !wordsDict.indexOf(word2) === -1)
    return null;

  let distance = Infinity;

  for (let i = 0; i < wordsDict.length; i++) {
    let word = wordsDict[i];
    if (word === word1) {
      for (let j = 0; j < wordsDict.length; j++) {
        let second = wordsDict[j];
        if (second === word2) {
          let difference = Math.abs(i - j);
          if (difference < distance) {
            distance = difference;
          }
        }
      }
    }
  }
  return distance;
};
