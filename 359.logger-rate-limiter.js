/**
Design a logger system that receives a stream of messages along with their timestamps. Each unique message should only be printed at most every 10 seconds (i.e. a message printed at timestamp t will prevent other identical messages from being printed until timestamp t + 10).

All messages will come in chronological order. Several messages may arrive at the same timestamp.

Implement the Logger class:

Logger() Initializes the logger object.
bool shouldPrintMessage(int timestamp, string message) Returns true if the message should be printed in the given timestamp, otherwise returns false.
 */
var Logger = function () {
  this.nextLog = {};
};

/**
* Returns true if the message should be printed in the given timestamp, otherwise returns false.
      If this method returns false, the message will not be printed.
      The timestamp is in seconds granularity. 
* @param {number} timestamp 
* @param {string} message
* @return {boolean}
*/
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
  if (
    this.nextLog[message] === undefined ||
    timestamp >= this.nextLog[message]
  ) {
    this.nextLog[message] = timestamp + 10;
    return true;
  }
  return false;
};

// use queue and set
var Logger = function () {
  this.msgQueue = [];
  this.msgSet = new Set();
};
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
  while (this.msgQueue.length > 0) {
    if (this.msgQueue[0][0] + 10 <= timestamp) {
      this.msgSet.delete(this.msgQueue[0][1]);
      this.msgQueue.shift();
    } else {
      break;
    }
  }
  if (this.msgSet.has(message)) {
    return false;
  } else {
    this.msgSet.add(message);
    this.msgQueue.push([timestamp, message]);
    return true;
  }
};
