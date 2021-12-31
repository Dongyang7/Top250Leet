/*
 * @lc app=leetcode id=273 lang=javascript
 *
 * [273] Integer to English Words
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num) {
  if (num === 0) return "Zero";
  const lessThan20 = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousand = ["", " Thousand ", " Million ", " Billion ", " Trillion "];
  let numArr = (num + "").split("");
  let [reArranged, curList] = [[], []];
  for (let i = numArr.length - 1; i >= 0; i--) {
    curList.push(numArr[i]);
    if (curList.length === 3) {
      reArranged.push([...curList]);
      curList = [];
    }
  }
  if (curList.length > 0) reArranged.push(curList);
  let curStr = "";
  let finalRes = "";
  //   [["1", "9", "8"], ["7", "6", "5"], ["4", "3", "2"], ["1"]];
  console.log(reArranged);
  for (let i = reArranged.length - 1; i >= 0; i--) {
    if (reArranged[i].length === 3) {
      let curNum = reArranged[i].pop();
      if (curNum !== "0") {
        curStr +=
          lessThan20[curNum] +
          " Hundred" +
          (reArranged[i][0] === "0" && reArranged[i][1] === "0" ? "" : " ");
      }
    }
    if (reArranged[i].length === 2) {
      if (reArranged[i][1] < "2") {
        curStr +=
          lessThan20[
            parseInt(reArranged[i][1]) * 10 + parseInt(reArranged[i][0])
          ];
        reArranged[i] = [];
      } else {
        curStr += tens[reArranged[i].pop()] + " ";
      }
    }
    if (reArranged[i].length === 1) {
      let lastNum = reArranged[i].pop();
      if (lastNum === "0") {
        curStr = curStr.slice(0, curStr.length - 1);
      }
      curStr += lessThan20[lastNum];
    }
    if (curStr.length) {
      finalRes += curStr + thousand[i];
    }
    curStr = "";
  }
  return finalRes.trim();
};
// @lc code=end
