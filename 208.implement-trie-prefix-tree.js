/*
 * @lc app=leetcode id=208 lang=javascript
 *
 * [208] Implement Trie (Prefix Tree)
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
var TrieNode = function () {
  this.children = {};
  this.isWord = false;
};
var Trie = function () {
  this.startNode = new TrieNode();
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let curNode = this.startNode;
  for (let i = 0; i < word.length; i++) {
    if (!curNode.children[word[i]]) {
      curNode.children[word[i]] = new TrieNode();
    }
    curNode = curNode.children[word[i]];
  }
  curNode.isWord = true;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let curNode = this.startNode;
  for (let i = 0; i < word.length; i++) {
    if (!curNode.children[word[i]]) return false;
    curNode = curNode.children[word[i]];
  }
  return curNode.isWord;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let curNode = this.startNode;
  for (let i = 0; i < prefix.length; i++) {
    if (!curNode.children[prefix[i]]) return false;
    curNode = curNode.children[prefix[i]];
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end
