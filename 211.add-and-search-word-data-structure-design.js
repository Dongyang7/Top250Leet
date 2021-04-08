/* Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter. */

/**
 * Initialize your data structure here.
 */
var StringNode = function (value) {
  this.char = value;
  this.next = {};
  this.isWord = false;
};

var WordDictionary = function () {
  this.node = new StringNode("");
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let curNode = this.node;
  for (let i = 0; i < word.length; i++) {
    if (!curNode.next[word[i]]) {
      curNode.next[word[i]] = new StringNode(word[i]);
    }
    curNode = curNode.next[word[i]];
  }
  curNode.isWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  const dfs = (node, idx) => {
    if (idx === word.length && node.isWord) {
      return true;
    }
    let curChar = word[idx];
    if (curChar === ".") {
      for (nextChar in node.next) {
        if (!dfs(node.next[nextChar], idx + 1)) continue;
        else return true;
      }
      return false;
    } else if (!node.next[curChar]) return false;
    else return dfs(node.next[curChar], idx + 1);
  };
  return dfs(this.node, 0);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
