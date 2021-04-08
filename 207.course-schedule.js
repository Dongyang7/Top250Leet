/*
 * @lc app=leetcode id=207 lang=javascript
 *
 * [207] Course Schedule
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  let hash = {};
  for (let i = 0; i < prerequisites.length; i++) {
    if (hash[prerequisites[i][0]]) {
      hash[prerequisites[i][0]].push(prerequisites[i][1]);
    } else {
      hash[prerequisites[i][0]] = [prerequisites[i][1]];
    }
  }
  const visitedNode = new Array(numCourses).fill(false);
  const path = new Array(numCourses).fill(false);
  const dfs = (courseId) => {
    if (path[courseId]) return false;
    if (!hash[courseId] || visitedNode[courseId]) return;
    path[courseId] = true;
    visitedNode[courseId] = true;
    let preLevel = hash[courseId];
    for (let j = 0; j < preLevel.length; j++) {
      if (dfs(preLevel[j]) === false) return false;
    }
    path[courseId] = false;
  };
  for (let i = 0; i < numCourses; i++) {
    if (dfs(i) === false) return false;
  }
  return true;
};
// @lc code=end
