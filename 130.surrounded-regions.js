/*
 * @lc app=leetcode id=130 lang=javascript
 *
 * [130] Surrounded Regions

// @lc code=start
/**
 * @param {character[][]} playground
 * @return {void} Do not return anything, modify playground in-place instead.
 */
var solve = function(playground) {
  const dfs = value => {
    if (
      value[0] < 0 ||
      value[0] >= playground.length ||
      value[1] < 0 ||
      value[1] >= playground[0].length ||
      playground[value[0]][value[1]] !== "O"
    )
      return;
    playground[value[0]][value[1]] = "#";
    dfs([value[0] - 1, value[1]]);
    dfs([value[0] + 1, value[1]]);
    dfs([value[0], value[1] - 1]);
    dfs([value[0], value[1] + 1]);
  };
  if (!playground || playground.length < 3 || playground[0].length < 3)
    return playground;
  let border = [];
  const width = playground[0].length;
  const height = playground.length;
  for (let i = 0; i < playground.length; i += 1) {
    if (playground[i][0] === "O") {
      border.push([i, 0]);
      //   playground[i][0] = "#";
    }
    if (playground[i][width - 1] === "O") {
      border.push([i, width - 1]);
      //   playground[i][width - 1] = "#";
    }
  }
  for (let i = 0; i < playground[0].length; i += 1) {
    if (playground[0][i] === "O") {
      border.push([0, i]);
      //   playground[0][i] = "#";
    }
    if (playground[height - 1][i] === "O") {
      border.push([height - 1, i]);
      //   playground[height - 1][i] = "#";
    }
  }
  console.log(playground);
  border.forEach(value => {
    dfs(value);
  });
  console.log(playground);
  for (let i = 0; i < playground.length; i += 1) {
    for (let j = 0; j < playground[0].length; j += 1) {
      if (playground[i][j] === "O") playground[i][j] = "X";
      if (playground[i][j] === "#") playground[i][j] = "O";
    }
  }
  return playground;
};

solve([
  ["O", "O", "O"],
  ["O", "O", "O"],
  ["O", "O", "O"]
]);
// @lc code=end
