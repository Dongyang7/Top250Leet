/*
 * @lc app=leetcode id=138 lang=javascript
 *
 * [138] Copy List with Random Pointer
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
// Map object can store object as key, in this case we store the random node as key, and the corresponding index as value
var copyRandomList = function (head) {
  if (!head) return null;
  const listArr = [];
  const newListArr = [];
  const randomIdxMap = new Map();
  let n = 0;
  while (head) {
    listArr.push(head);
    let newNode = new Node(head.val, null, null);
    newListArr.push(newNode);
    randomIdxMap.set(head, n);
    head = head.next;
    n++;
  }
  for (let i = 0; i < n; i++) {
    newListArr[i].next = i + 1 >= n ? null : newListArr[i + 1];
    if (listArr[i].random) {
      newListArr[i].random = newListArr[randomIdxMap.get(listArr[i].random)];
    }
  }
  return newListArr[0];
};
// 上面的代码我们使用了两个array分别来存放旧的和新的list，同时还有一个map来map旧的node到idx上。我们完全可以直接用一个map替代这三个，map的key是旧的node，value就是新的node。
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}
var copyRandomList = function (head) {
  if (!head) return null;
  const randomMap = new Map();
  let newNode = new Node(head.val, null, null);
  let dummy = new Node(0, newNode, null);
  let oldNode = head;
  randomMap.set(head, newNode);
  while (oldNode) {
    if (oldNode.next) {
      if (randomMap.get(oldNode.next)) {
        newNode.next = randomMap.get(oldNode.next);
      } else {
        newNode.next = new Node(oldNode.next.val, null, null);
        randomMap.set(oldNode.next, newNode.next);
      }
    }
    if (oldNode.random) {
      if (randomMap.get(oldNode.random)) {
        newNode.random = randomMap.get(oldNode.random);
      } else {
        newNode.random = new Node(oldNode.random.val, null, null);
        randomMap.set(oldNode.random, newNode.random);
      }
    }
    oldNode = oldNode.next;
    newNode = newNode.next;
  }
  return dummy.next;
};
var n3 = new Node(3, null, null);
var n2 = new Node(2, n3, n1);
var n1 = new Node(1, n2, null);
n2.random = n1;
copyRandomList(n1);
// @lc code=end
