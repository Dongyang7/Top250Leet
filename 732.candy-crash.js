/**
 * @param {number[][]} board
 * @return {number[][]}
 */
// 之前我成功把要crash的candy都mark了，但一直不知道该怎么crash他们；实际上只需要从上到下遍历一个col时保持一个stack，如果当前candy不会被crash，就push进stack，然后到达col底部后再从下到上开始pop，stack空了就用0填充。现在想想看，crash这一步看起来就像是需要stack的样子
var candyCrush = function (board) {
  let [m, n] = [board.length, board[0].length];
  const crashFn = () => {
    let markedCandies = new Set();
    const findMarkAllAdjcent = (i, j, direction) => {
      let adjLen = 3;
      if (direction === "horizontal") {
        while (j + adjLen < n && board[i][j] === board[i][j + adjLen]) {
          adjLen++;
        }
        for (let p = 0; p < adjLen; p++) {
          markedCandies.add(i + "-" + (j + p) + "-" + "h");
        }
      } else if (direction === "vertical") {
        while (i + adjLen < m && board[i][j] === board[i + adjLen][j]) {
          adjLen++;
        }
        for (let p = 0; p < adjLen; p++) {
          markedCandies.add(i + p + "-" + j + "-" + "v");
        }
      }
    };
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        let curCandy = board[i][j];
        if (curCandy === 0) continue;
        if (
          j + 2 < n &&
          !markedCandies.has(i + "-" + j + "-" + "h") &&
          curCandy === board[i][j + 1] &&
          curCandy === board[i][j + 2]
        ) {
          findMarkAllAdjcent(i, j, "horizontal");
        }
        if (
          i + 2 < m &&
          !markedCandies.has(i + "-" + j + "-" + "v") &&
          curCandy === board[i + 1][j] &&
          curCandy === board[i + 2][j]
        ) {
          findMarkAllAdjcent(i, j, "vertical");
        }
      }
    }
    if (markedCandies.size === 0) return;
    for (let j = 0; j < n; j++) {
      let candyLeft = [];
      let i = 0;
      while (i < m) {
        if (
          !markedCandies.has(i + "-" + j + "-" + "h") &&
          !markedCandies.has(i + "-" + j + "-" + "v")
        ) {
          candyLeft.push(board[i][j]);
        }
        i++;
      }
      i--;
      while (i >= 0) {
        if (candyLeft.length > 0) {
          board[i][j] = candyLeft.pop();
        } else {
          board[i][j] = 0;
        }
        i--;
      }
    }
    crashFn();
  };
  crashFn();
  return board;
};
