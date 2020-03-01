// Assume it's N^N board.
// 2 is start and end point, 1 is the road, and 0 is the wall. We can move to up, down, left, and right if the next node is 1.
// Find the shortest path that can go from start to end:
// public Path findPath(int[][] board, int[] start, int[] end) {
// }
// int[][] board = {
//           {0,2,0,0,0,0},
//           {0,1,1,0,0,0},
//           {1,1,1,1,1,0},
//           {1,0,0,0,1,0},
//           {1,1,1,1,1,0},
//           {0,0,2,0,0,0}};
//         int[] start = {0,1};
//         int[] end = {5,2};

const shortestPath = (board, start, end) => {
  const curLevel = [start];
  const len = 0
  while (curLevel.length !== 0) {
    for (let i = 0; i < curLevel.length; i += 1) {
      let index = curLevel[i];
      let surrouding = [
        [index[0], index[1] + 1],
        [index[0], index[1] - 1],
        [index[0] - 1, index[1]],
        [index[0] + 1,index[1]]
      ];
      let newCurLevel = []
      for (let m = 0; m < 4; m += 1) {
        let neighbor = surrouding[m]
        if (neighbor[0]<0||neighbor[0]>=board.length||neighbor[1]<0||neighbor[1]>board[0].length) {
          if (board[])
          if (board[neighbor[0],neighbor[1]]===1) newCurLevel.push(neighbor)
        }
      }
      len += 1
    }
  }
};
console.log(
  shortestPath(
    [
      [0, 2, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [0, 0, 2, 0, 0, 0]
    ],
    [0, 1],
    [5, 2]
  )
);

// [[0,1],[1, 1],[2, 1], [2,0],...]
