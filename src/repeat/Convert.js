export const convertToRepeat = (ballNumber, csv) => {
  let res = [];
  for (let x = 0; x < 2; x++) res.push(0);
  for (let i = 2; i < csv.length; i++) {
    let num = (csv[i][ballNumber]); 
    if (num == null || num === "") continue; 
    if ((csv[i - 1][0] === num) || (csv[i - 1][1] === num) || (csv[i - 1][2] === num) ||
    (csv[i - 1][3] === num) || (csv[i - 1][4] === num) || (csv[i - 1][5] === num)) {
      res.push(2);
    } else if ((csv[i - 2][0] === num) || (csv[i - 2][1] === num) || (csv[i - 2][2] === num) ||
    (csv[i - 2][3] === num) || (csv[i - 2][4] === num) || (csv[i - 2][5] === num)) {
      res.push(1);
    } else {
      res.push(0);
    }
  }
  return res;
}
