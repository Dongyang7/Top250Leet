/*
 * @lc app=leetcode id=399 lang=javascript
 *
 * [399] Evaluate Division
 */

// @lc code=start
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const hash = {};
  for (let i = 0; i < equations.length; i++) {
    if (hash[equations[i][0]]) {
      hash[equations[i][0]].push(equations[i][1] + "=" + i);
    } else {
      hash[equations[i][0]] = [equations[i][1] + "=" + i];
    }
    if (hash[equations[i][1]]) {
      hash[equations[i][1]].push(equations[i][0] + "=" + i);
    } else {
      hash[equations[i][1]] = [equations[i][0] + "=" + i];
    }
  }
  const resArr = [];
  let visited = {};
  const dfs = ([dividend, divisor], tmpRes) => {
    if (visited[dividend]) return -1;
    console.log(dividend, divisor, tmpRes);
    visited[dividend] = true;
    let nextLevel = hash[dividend];
    for (let j = 0; j < nextLevel.length; j++) {
      let [linkedVar, valuesIdx] = nextLevel[j].split("=");
      if (linkedVar === divisor) {
        return (
          tmpRes *
          (linkedVar === equations[valuesIdx][1]
            ? values[valuesIdx]
            : 1 / values[valuesIdx])
        );
      }
    }
    for (let j = 0; j < nextLevel.length; j++) {
      let [linkedVar, valuesIdx] = nextLevel[j].split("=");
      let tmp = dfs(
        [linkedVar, divisor],
        tmpRes *
          (linkedVar === equations[valuesIdx][1]
            ? values[valuesIdx]
            : 1 / values[valuesIdx])
      );
      if (tmp !== -1) {
        return tmp;
      }
    }
    return -1;
  };
  for (let i = 0; i < queries.length; i++) {
    if (!hash[queries[i][0]] || !hash[queries[i][1]]) {
      resArr.push(-1.0);
    } else {
      resArr.push(dfs(queries[i], 1));
      visited = {};
    }
  }
  return resArr;
};

/* UNION FIND */

var calcEquation = function (equations, values, queries) {
  const unionHash = {};
  const find = (node) => {
    if (!unionHash[node]) {
      unionHash[node] = [node, 1];
    }
    let [nodeGroup, nodeWeight] = unionHash[node];
    if (node !== nodeGroup) {
      let [newGroup, weight] = find(nodeGroup);
      unionHash[node] = [newGroup, weight * nodeWeight];
    }
    return unionHash[node];
  };
  const union = (dividend, divisor, value) => {
    let [dividendGroupId, dividendWeight] = find(dividend);
    let [divisorGroupId, divisorWeight] = find(divisor);
    if (divisorGroupId !== dividendGroupId) {
      unionHash[dividendGroupId] = [
        divisorGroupId,
        (value * divisorWeight) / dividendWeight,
      ]; // why divide by dividendWeight?
    }
  };
  for (let i = 0; i < equations.length; i++) {
    let [dividend, divisor] = [equations[i][0], equations[i][1]];
    union(dividend, divisor, values[i]);
  }
  let res = [];
  for (let i = 0; i < queries.length; i++) {
    let [dividend, divisor] = [queries[i][0], queries[i][1]];
    if (!unionHash[dividend] || !unionHash[divisor]) res.push(-1);
    else {
      let [dividendGroupId, dividendWeight] = find(dividend);
      let [divisorGroupId, divisorWeight] = find(divisor);
      if (dividendGroupId !== divisorGroupId) {
        res.push(-1);
      } else {
        res.push(dividendWeight / divisorWeight);
      }
    }
  }
  return res;
};
// @lc code=end
