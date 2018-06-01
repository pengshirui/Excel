export const convertToSoloNextPass = (ballNumber, csv) => {
  let res = [];
  for (let x = 0; x < 1; x++) res.push(0);
  for (let i = 1; i < csv.length; i++) {
    let num = (csv[i][ballNumber]); 
    if (num == null || num === "") continue; 
    if ((csv[i - 1][0] === num) || (csv[i - 1][1] === num) || (csv[i - 1][2] === num) ||
      (csv[i - 1][3] === num) || (csv[i - 1][4] === num) || (csv[i - 1][5] === num)) {
      res.push(2);
    } else if ((Math.abs(csv[i - 1][0] - num) === 1) || (Math.abs(csv[i - 1][1] - num) === 1) || (Math.abs(csv[i - 1][2] - num) === 1) ||
    (Math.abs(csv[i - 1][3] - num) === 1) || (Math.abs(csv[i - 1][4] - num) === 1) || (Math.abs(csv[i - 1][5] - num) === 1)) {
      res.push(1);
    } else {
      res.push(0);
    }
  }
  return res;
}