export const convertToColdWarmHot = (ballNumber, csv) => {
  let res = [];
  for (let x = 0; x < 10; x++) res.push(0);
  for (let i = 10; i < csv.length; i++) {
    let num = (csv[i][ballNumber]);
    let count = 0;
    for (let j = 10; j > 0; j--) {
      if ((csv[i - j][0] === num) || (csv[i - j][1] === num) || (csv[i - j][2] === num) ||
      (csv[i - j][3] === num) || (csv[i - j][4] === num) || (csv[i - j][5] === num)) {
        count++;
      }
    }
    if (count <= 1) {
      res.push(0);
    } else if (count === 2) {
      res.push(1);
    } else if (count >= 3) {
      res.push(2);
    }
  }
  return res;
}
