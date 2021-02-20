/*
 * @lc app=leetcode id=274 lang=javascript
 *
 * [274] H-Index
 */

// @lc code=start
/**
 * @param {number[]} citations
 * @return {number}
 */
/*我的思路：题干让我想到去寻找第h大的数字，很自然地想到要逆向排序，
然后列举了一些例子后发现需要分情况讨论：index+1代表得是包括当前文章在内的引用数大于等于
此文章引用数的文章数量1.最小引用也比论文数量大的情况；
2.在第一种的补集里，也需要讨论一种是index+1和当前文章引用数相同，
另一种是index+1大于当前引用数的情况 */
var hIndex = function (citations) {
  citations.sort((a, b) => b - a);
  for (let i = 0; i < citations.length; i++) {
    if (i + 1 > citations[i]) {
      return i;
    } else if (i + 1 === citations[i]) {
      return i + 1;
    }
  }
  return citations.length;
};

var useExtraSpace = function (citations) {
  let counting = new Array(citations.length + 1).fill(0);
  citations.forEach((element) => {
    if (element >= citations.length) {
      counting[citations.length] += 1;
    } else {
      counting[element] += 1;
    }
  });
  let paperSum = 0;
  for (let i = counting.length - 1; i >= 0; i--) {
    paperSum += counting[i];
    if (paperSum >= i) {
      return i;
    }
  }
};
// @lc code=end
