/*
 * @lc app=leetcode id=1396 lang=javascript
 *
 * [1396] Design Underground System
 */

// @lc code=start

var UndergroundSystem = function () {
  this.map = {};
  this.traveling = {};
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  this.traveling[id] = { prevStation: stationName, prevT: t };
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  let { prevStation, prevT } = this.traveling[id];
  let accTime = this.map[prevStation + "-" + stationName];
  if (accTime) {
    accTime[0] += t - prevT;
    accTime[1]++;
  } else {
    this.map[prevStation + "-" + stationName] = [t - prevT, 1];
  }
  delete this.traveling[id];
};

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function (
  startStation,
  endStation
) {
  return (
    this.map[startStation + "-" + endStation][0] /
    this.map[startStation + "-" + endStation][1]
  );
};

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */
// @lc code=end
