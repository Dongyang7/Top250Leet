/**
 * @param {number[][]} intervals
 * @return {number}
 */
// 还是先按照start sort整个array，然后大概的思路是，我们保留一个array来存储进行中的meeting的end time，当遍历到一个interval时，如果start已经晚于一些end time，我们将这些end time从array中删除，然后再把当前interval的end time push进去；用res记录这个array的length最大值，那个就是同一时间同时进行的meeting最大值。
var minMeetingRooms = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let [res, meetingEndList] = [0, []];
  const removeEndMeeting = (start) => {
    for (let j = 0; j < meetingEndList.length; j++) {
      if (meetingEndList[j] <= start) {
        meetingEndList.splice(j, 1);
      }
    }
  };
  for (let i = 0; i < intervals.length; i++) {
    if (i === 0) {
      res++;
      meetingEndList.push(intervals[i][1]);
    } else {
      removeEndMeeting(intervals[i][0]);
      meetingEndList.push(intervals[i][1]);
      res = Math.max(res, meetingEndList.length);
    }
  }
  return res;
};
// 2 sorted arr
var minMeetingRooms = function (intervals) {
  let [startArr, endArr] = [[], []];
  for (let [start, end] of intervals) {
    startArr.push(start);
    endArr.push(end);
  }
  startArr.sort((a, b) => a - b);
  endArr.sort((a, b) => a - b);
  let [s, e, res] = [0, 0, 0];
  while (s < intervals.length) {
    if (startArr[s] >= endArr[e]) {
      e++;
    } else {
      res++;
      s++;
    }
  }
  return res;
};
