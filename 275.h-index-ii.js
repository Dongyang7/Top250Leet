/*
 * @lc app=leetcode id=275 lang=javascript
 *
 * [275] H-Index II
 */

// @lc code=start
/**
 * @param {number[]} citations
 * @return {number}
 */
/*这都说了logN的时间复杂度了，自然就是二分法解决啦 */
var hIndex = function (citations) {
  var len = citations.length;
  if (len === 0) return 0;
  let low = 0;
  let high = len - 1;
  let mid = (high + low) >> 1;
  let res;
  while (low <= high) {
    if (len - mid <= citations[mid]) {
      if (res) {
        res = Math.max(len - mid, res);
      } else {
        res = len - mid;
      }
      high = mid - 1;
      mid = (high + low) >> 1;
    } else {
      low = mid + 1;
      mid = (high + low) >> 1;
    }
  }
  return res;
};
// @lc code=end
