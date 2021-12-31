/*
 * @lc app=leetcode id=68 lang=javascript
 *
 * [68] Text Justification
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  let [remainWidth, linesArr, curLine, remainArr] = [maxWidth, [], [], []];
  for (let i = 0; i < words.length; i++) {
    if (remainWidth < words[i].length) {
      linesArr.push(curLine);
      curLine = [words[i]];
      remainArr.push(remainWidth + 1);
      remainWidth = maxWidth - words[i].length - 1;
    } else {
      curLine.push(words[i]);
      remainWidth -= words[i].length + 1;
    }
  }
  //   console.log(linesArr, remainArr, curLine);
  let res = [];
  for (let i = 0; i < linesArr.length; i++) {
    let line = linesArr[i];
    if (line.length === 1) {
      res.push(line[0] + " ".repeat(maxWidth - line[0].length));
      continue;
    }
    let [spaceNum, leftN, curSentence] = [
      Math.floor(remainArr[i] / (line.length - 1)),
      remainArr[i] % (line.length - 1),
      "",
    ];
    for (let j = 0; j < line.length; j++) {
      curSentence += line[j];
      if (!(j === line.length - 1 && line.length > 1)) {
        curSentence += " ".repeat(spaceNum + 1);
      }
      if (j < leftN) {
        curSentence += " ";
      }
    }
    res.push(curSentence);
    curSentence = "";
  }
  let lastLine = curLine.join(" ");
  res.push(lastLine + " ".repeat(maxWidth - lastLine.length));
  return res;
};
// @lc code=end
