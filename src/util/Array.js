export const getCol = (twoDArr, colNum) => {
  let res = [];
  for(let i = 0; twoDArr && i < twoDArr.length; i++) {
    if (colNum < twoDArr[i].length) {
      if (twoDArr[i][colNum] && !isNaN(twoDArr[i][colNum])) {
        res.push(twoDArr[i][colNum]);
      }
    }
  }
  return res;
}
  
const getColAsStr = (twoDArr, colNum) => {
  const res = getCol(twoDArr, colNum);
  return res ? res.join() : '';
}
  
export const convertTwoDArrToOptions = (data) => {
  const b1 = getColAsStr(data, 0);
  const b2 = getColAsStr(data, 1);
  const b3 = getColAsStr(data, 2);
  const b4 = getColAsStr(data, 3);
  const b5 = getColAsStr(data, 4);
  const b6 = getColAsStr(data, 5);
  const b7 = getColAsStr(data, 6);
  let options = [];
  if (b1) options.push ({ label: '1号球', id: b1  });
  if (b2) options.push ({ label: '2号球', id: b2  });
  if (b3) options.push ({ label: '3号球', id: b3  });
  if (b4) options.push ({ label: '4号球', id: b4  });
  if (b5) options.push ({ label: '5号球', id: b5  });
  if (b6) options.push ({ label: '6号球', id: b6  });
  if (b7) options.push ({ label: '7号球', id: b7  });
  return options;
}

export const convertStrToArr = (str) => {
  let arr = str ? str.split(",") : [];
  let numArr = arr.map(Number)
  return numArr;
}