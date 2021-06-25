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
var ladderLength = function (beginWord, endWord, wordList) {
  const pairMap = new Map();
  const queue = [beginWord];
  while (queue.length > 0) {
    let curWord = queue.shift();
  }
};
// @lc code=end
