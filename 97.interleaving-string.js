/*
 * @lc app=leetcode id=97 lang=javascript
 *
 * [97] Interleaving String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  if (s3.length !== s1.length + s2.length) return false;
  const hash1 = new Set();
  const hash2 = new Set();
  const helper1 = (p1, p2, p3) => {
    let hashKey = [p1, p2, p3].join();
    if (hash1.has(hashKey)) return false;
    if (p3 >= s3.length) return true;
    while (s1[p1] === s3[p3] && p1 < s1.length) {
      let nextOutput = helper2(++p1, p2, ++p3);
      if (nextOutput) return true;
    }
    hash1.add(hashKey);
    return false;
  };
  const helper2 = (p1, p2, p3) => {
    let hashKey = [p1, p2, p3].join();
    if (hash2.has(hashKey)) return false;
    if (p3 >= s3.length) return true;
    while (s2[p2] === s3[p3] && p2 < s2.length) {
      let nextOutput = helper1(p1, ++p2, ++p3);
      if (nextOutput) return true;
    }
    hash2.add(hashKey);
    return false;
  };
  return helper1(0, 0, 0) || helper2(0, 0, 0);
};
// @lc code=end
