/*
 * @lc app=leetcode id=811 lang=javascript
 *
 * [811] Subdomain Visit Count
 */

// @lc code=start
/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
  const freqMap = {};
  for (cpdomain of cpdomains) {
    let [freq, domain] = cpdomain.split(" ");
    let domainList = domain.split(".");
    let curDomain = domainList[domainList.length - 1];
    for (let i = domainList.length - 1; i >= 0; i--) {
      if (i !== domainList.length - 1) {
        curDomain = domainList[i] + "." + curDomain;
      }
      freqMap[curDomain] = (freqMap[curDomain] || 0) + parseInt(freq);
    }
  }
  return Object.keys(freqMap).map((key) => freqMap[key] + " " + key);
};
// @lc code=end
