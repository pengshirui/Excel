import { getCol } from '../util/Array.js';


export const convertToColdWarmHot = (ballNumber, csv) => {
  let res = [];
  let selectedBallList = csv[ballNumber]
  for (let i = 10; i < csv.length; i++) {
    let num = (csv[i][ballNumber - 1]);
    for (let j = 0; j < 10; j++) {
      
    }
  }
  return res;
}
