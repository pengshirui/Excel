const fs = window.require('fs');

const readFile = (path) => {
  if (path.endsWith("csv")) {
    return fs.readFileSync(path, 'utf8');
  } else {
    return;
  }
}

const convertCsvTo2DArray = (content) => {
  try {
    return content ? content.split("\n").map(function (row) { return row.split(","); }) : [];
  } catch (e) {
    print(e);
    return [];
  }
}

export const getCol = (twoDArr, colNum) => {
  let res = [];
  for(let i = 0; i < twoDArr.length; i++) {
    if (colNum < twoDArr[i].length) {
      if (twoDArr[i][colNum] && !isNaN(twoDArr[i][colNum])) {
        res.push(twoDArr[i][colNum]);
      }
    }
  }
  return res;
}

export const readCsvAs2DArr = (path) => {
  const content = readFile(path);
  const twoDArr = convertCsvTo2DArray(content);
  return twoDArr;
}