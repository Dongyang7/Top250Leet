/*
 * @lc app=leetcode id=679 lang=javascript
 *
 * [679] 24 Game
 */

// @lc code=start
/**
 * @param {number[]} cards
 * @return {boolean}
 */
// 开始我想着遍历cards的组合，对每个组合再遍历各种operator的组合，但这个实在是太难实现了；后来看到hint：其实括号的存在就允许我们不用管操作的顺序；operator每次只对两个数字进行运算，我们取当前array随意两位置的数字，两数计算后会变成一个数字，用它替换掉原来的数字，产生新的array代入下一层func中。我们只需要计算到只剩一个数字在和24对比就好了。
var FLOAT_ROUND = 0.0001; // js的float运算比如8/0.3333333333333335结果为23.99999999999999，所以我们要给一个round precision。
var judgePoint24 = function (cards) {
  const backtrack = (curCards) => {
    if (curCards.length === 1 && Math.abs(curCards[0] - 24) < FLOAT_ROUND) {
      return true;
    } else {
      for (let i = 0; i < curCards.length; i++) {
        for (let j = 0; j < curCards.length; j++) {
          if (j !== i) {
            let restItems = curCards.filter(
              (item, idx) => idx !== i && idx !== j
            );
            if (backtrack([curCards[i] + curCards[j], ...restItems]))
              return true;
            if (backtrack([curCards[i] - curCards[j], ...restItems]))
              return true;
            if (backtrack([curCards[i] * curCards[j], ...restItems]))
              return true;
            if (backtrack([curCards[i] / curCards[j], ...restItems]))
              return true;
          }
        }
      }
    }
  };
  if (backtrack([...cards])) {
    return true;
  }
  return false;
};
// @lc code=end
