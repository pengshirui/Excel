const fs = window.require('fs');

export const readFile = (path) => {
  return fs.readFileSync(path, 'utf8');
}

export const getCol = (twoDArr, colNum) => {
  let res = [];
  for(let i = 0; i < twoDArr.length; i++) {
    res.push(twoDArr[i][colNum]);
  }
  return res;
}

export const convertCsvTo2DArray = (content) => {
  return content ? content.split("\n").map(function (row) { return row.split(","); }) : [];
}

export const convertStrToArr = (str) => {
  return str ? str.split(",") : [];
}