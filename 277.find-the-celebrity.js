/**
Suppose you are at a party with n people (labeled from 0 to n - 1), and among them, there may exist one celebrity. The definition of a celebrity is that all the other n - 1 people know him/her, but he/she does not know any of them.

Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is to ask questions like: "Hi, A. Do you know B?" to get information about whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given a helper function bool knows(a, b) which tells you whether A knows B. Implement a function int findCelebrity(n). There will be exactly one celebrity if he/she is in the party. Return the celebrity's label if there is a celebrity in the party. If there is no celebrity, return -1.


 * Definition for knows()
 *
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 */
var solution = function (knows) {
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  return function (n) {
    let celebrityCandidate = 0;
    for (let i = 0; i < n; i++) {
      if (celebrityCandidate === i) continue;
      if (knows(celebrityCandidate, i)) {
        celebrityCandidate = i;
      }
    }
    for (let i = 0; i < n; i++) {
      if (celebrityCandidate === i) continue;
      if (knows(celebrityCandidate, i) || !knows(i, celebrityCandidate))
        return -1;
    }
    return celebrityCandidate;
  };
};
// 面试的延伸问题可能是如何进一步优化，我们可以发现有些人物关系我们问了两遍，虽然最后优化过的依旧是On，但当knows API是个很耗时的过程时，我们宁愿用空间换取很多的时间。下面是solution的原解释
/* It's possible that calls to the knows(...) API could be really expensive (i.e. slow). For example, in the scenario presented in the question, you need to ask the question to people and then listen for their answer. This is time consuming! As a computer-based example, what if the knows(...) API was retrieving its answers from a really slow web service on the other side of the world? What if somebody was having to sit in front of their computer, waiting patiently for this algorithm to finish running? They would definitely appreciate it taking 5 seconds instead of 10 seconds, even if that difference is constant. */
var solution = function (knows) {
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  return function (n) {
    let celebrityCandidate = 0;
    for (let i = 0; i < n; i++) {
      if (celebrityCandidate === i) continue;
      if (knows(celebrityCandidate, i)) {
        celebrityCandidate = i;
      }
    }
    for (let i = 0; i < n; i++) {
      if (celebrityCandidate === i) continue;
      if (knows(celebrityCandidate, i) || !knows(i, celebrityCandidate))
        return -1;
    }
    return celebrityCandidate;
  };
};
