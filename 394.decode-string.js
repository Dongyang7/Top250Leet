/*
 * @lc app=leetcode id=394 lang=javascript
 *
 * [394] Decode String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// worst case O(N^2), recursion。一遇到bracket就会触发recursion，每次recursion都需要把传入的string整体走一遍，start bracket最多有N/4个，所以是O(N^2)
var decodeString = function (s) {
  const helper = (str) => {
    let multi = 0;
    let bracketStack = [];
    let levelRes = "";
    for (let i = 0; i < str.length; i++) {
      let outsideBracket = bracketStack.length === 0;
      if (str[i] === "[") {
        bracketStack.push(i);
      } else if (str[i] === "]") {
        let start = bracketStack.pop();
        if (bracketStack.length === 0) {
          levelRes += Array(multi)
            .fill(helper(str.slice(start + 1, i)))
            .join("");
          multi = 0;
        }
      } else {
        if (outsideBracket) {
          if (str[i] >= "a") {
            levelRes += str[i];
          } else {
            multi = multi * 10 + parseInt(str[i]);
          }
        }
      }
    }
    return levelRes;
  };
  return helper(s);
};
// 2 stacks, 这种带括号的就是是和用stack解决，我们设置两个stack分别存储string和num，每当遇到结束括号时就把当前stack顶的string和num join成string拼接到stringstack的前一层
// worst case O(maxK*N) K就是方括号前面的数字，因为我们对于每一个结束bracekt都需要join K个重复的str，层数和N线性相关，所以时间复杂度是这样。
// 至于空间复杂度，我们用了array来join string，所以空间复杂度是O(sum(K))，我们可以使用一个for循环来取代array join，节省空间复杂度。
var decodeString = function (s) {
  let [nStack, sStack] = [[0], [""]];
  for (char of s) {
    if (char === "[") {
      nStack.push(0);
      sStack.push("");
    } else if (char === "]") {
      while (nStack[nStack.length - 1] === 0) {
        nStack.pop();
      }
      let curS = sStack.pop();
      sStack[sStack.length - 1] += Array(nStack.pop()).fill(curS).join("");
      nStack.push(0); // 这一步是为了防止当同一层有好几个方括号时，后面方括号前的数字加到外层的数字上
    } else if (char >= "a") {
      sStack[sStack.length - 1] += char;
    } else {
      nStack[nStack.length - 1] =
        nStack[nStack.length - 1] * 10 + parseInt(char);
    }
  }
  return sStack[0];
};
// @lc code=end
