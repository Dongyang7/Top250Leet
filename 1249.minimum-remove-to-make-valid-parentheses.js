/*
 * @lc app=leetcode id=1249 lang=javascript
 *
 * [1249] Minimum Remove to Make Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (
      stack.length > 0 &&
      s[stack[stack.length - 1]] === "(" &&
      s[i] === ")"
    ) {
      stack.pop();
    } else if (s[i] === ")" || s[i] === "(") {
      stack.push(i);
    }
  }
  let res = "";
  for (let j = 0; j < stack.length; j++) {
    res += s.slice(j > 0 ? stack[j - 1] + 1 : 0, stack[j]); //这里应该也是O(N)，因为slice这个method仅仅go through了一遍string
  }
  res += s.slice(stack[stack.length - 1] + 1); // 从最后一个invalid位置到末尾的这段string也要加上去
  return res;
};
// @lc code=end
