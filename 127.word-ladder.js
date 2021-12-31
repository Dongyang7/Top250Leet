/*
 * @lc app=leetcode id=127 lang=javascript
 *
 * [127] Word Ladder
 */

// @lc code=start
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
// DFS和BFS都能解，但是DFS浪费的时间非常多。因为DFS需要遍历所有的可能路径来得到最短路径。而BFS是一层层向下的，我们第一次走通的就一定是最短的路径。
// 这道题可以理解为graph的搜索，这里构建graph edge的过程也很有趣，我最初的想法是对每一个word，遍历剩下所有的word，找到相邻的word，这种时间复杂度是O(M*N^2)；而solution给的方法是对每个word，遍历所有的char，每一步都把char换成*表示一个中间状态，再用map保存起这个中间状态到当前word的mapping；这种方法能够只需loop一遍wordlist，由于转化中间状态需要substring操作，所以总体时间复杂度是O(N*M^2)。一般情况下N比M大很多。
var ladderLength = function (beginWord, endWord, wordList) {
  const adjWords = {};
  let wordLen = beginWord.length;
  for (let word of wordList) {
    for (let i = 0; i < wordLen; i++) {
      let intermed = word.slice(0, i) + "*" + word.slice(i + 1);
      if (adjWords[intermed]) {
        adjWords[intermed].push(word);
      } else {
        adjWords[intermed] = [word];
      }
    }
  }
  const [queue, visited] = [[[beginWord, 1]], new Set()];
  while (queue.length > 0) {
    let [curWord, level] = queue.shift();
    for (let i = 0; i < wordLen; i++) {
      let intermed = curWord.slice(0, i) + "*" + curWord.slice(i + 1);
      if (adjWords[intermed]) {
        for (let nextWord of adjWords[intermed]) {
          if (nextWord === endWord) return level + 1;
          if (!visited.has(nextWord)) {
            queue.push([nextWord, level + 1]);
            visited.add(nextWord);
          }
        }
      }
    }
  }
  return 0;
};
// @lc code=end
