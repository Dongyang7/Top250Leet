/*
 * @lc app=leetcode id=212 lang=javascript
 *
 * [212] Word Search II
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  let [m, n, res, initialMap] = [board.length, board[0].length, new Set(), {}];
  for (let word of words) {
    if (initialMap[word[0]]) {
      initialMap[word[0]].push(word);
    } else {
      initialMap[word[0]] = [word];
    }
  }
  const backtrack = (i, j, word, idx) => {
    if (idx === word.length - 1) {
      res.add(word);
      return true;
    } else {
      let adjCells = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ];
      for (let [row, col] of adjCells) {
        if (
          row >= 0 &&
          row < m &&
          col >= 0 &&
          col < n &&
          board[row][col] === word[idx + 1]
        ) {
          board[row][col] = "#";
          let curRes = backtrack(row, col, word, idx + 1);
          board[row][col] = word[idx + 1];
          if (curRes) return true;
        }
      }
    }
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let wordArr = initialMap[board[i][j]];
      if (wordArr) {
        for (let word of wordArr) {
          if (!res.has(word)) {
            board[i][j] = "#";
            backtrack(i, j, word, 0);
            board[i][j] = word[0];
          }
        }
      }
    }
  }
  return [...res];
};
// use trie to store the words;
var TrieNode = function (char) {
  this.char = char;
  this.children = {};
  //   this.isWord = false;
  this.word = null; //不必拘泥于只用trie的isWord。我们可以直接把isWord替换成那个word，这样就不需要从root开始记录charList了
};
var findWords = function (board, words) {
  let [m, n, res, trieRoot] = [
    board.length,
    board[0].length,
    new Set(),
    new TrieNode(null),
  ];
  for (let word of words) {
    let curNode = trieRoot;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!curNode.children[char]) {
        curNode.children[char] = new TrieNode(char);
      }
      curNode = curNode.children[char];
      if (i === word.length - 1) curNode.word = word;
    }
  }
  const backtrack = (i, j, curNode) => {
    if (curNode.word) {
      res.add(curNode.word);
    }
    let adjCells = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ];
    for (let [row, col] of adjCells) {
      if (row >= 0 && row < m && col >= 0 && col < n) {
        let nextNode = curNode.children[board[row][col]];
        if (nextNode) {
          let tmp = board[row][col];
          board[row][col] = "#";
          backtrack(row, col, nextNode);
          if (Object.keys(nextNode.children).length === 0) {
            // 最初这个条件只有在下个node为word末尾时才成立，然后backtrack会逐层回溯，只要没有其他的child，最终会把这个word所在的整个branch都删掉，能够防止后面再次访问它
            delete curNode.children[tmp]; //
          }
          board[row][col] = tmp;
        }
      }
    }
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let curNode = trieRoot.children[board[i][j]];
      if (curNode) {
        let tmp = board[i][j];
        board[i][j] = "#";
        backtrack(i, j, curNode);
        board[i][j] = tmp;
      }
    }
  }
  return [...res];
};
// @lc code=end
