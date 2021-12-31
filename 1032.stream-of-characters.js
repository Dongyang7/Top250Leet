/*
 * @lc app=leetcode id=1032 lang=javascript
 *
 * [1032] Stream of Characters
 */

// @lc code=start
/**
 * @param {string[]} words
 */
var TrieNode = function (char) {
  this.char = char;
  this.children = {};
  this.isWord = false;
};
var StreamChecker = function (words) {
  this.root = new TrieNode(null);
  this.curNodeList = [];
  for (word of words) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      if (node.children[word[i]]) {
        node = node.children[word[i]];
      } else {
        node = node.children[word[i]] = new TrieNode(word[i]);
      }
    }
    node.isWord = true;
  }
};

/**
 * @param {character} letter
 * @return {boolean}
 */
// curNodeList里面是当前所有可能组成word的node，query新的letter时，我们筛选掉不可能组成word的node。所以每次query我们都要过一遍这个list，这个list的最大size是words的arr长度，所以timeworst case是O(N)。
StreamChecker.prototype.query = function (letter) {
  if (this.curNodeList.length === 0) {
    if (this.root.children[letter]) {
      this.curNodeList.push(this.root.children[letter]);
      return this.root.children[letter].isWord;
    }
    return false;
  } else {
    let [res, newList] = [false, []];
    for (let idx = 0; idx < this.curNodeList.length; idx++) {
      let curNode = this.curNodeList[idx];
      if (curNode.children[letter]) {
        newList.push(curNode.children[letter]);
        if (curNode.children[letter].isWord) {
          res = true;
        }
      }
    }
    if (this.root.children[letter]) {
      if (this.root.children[letter].isWord) {
        res = true;
      }
      newList.push(this.root.children[letter]);
    }
    this.curNodeList = newList;
    return res;
  }
};
