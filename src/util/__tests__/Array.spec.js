import { convertStrToArr } from "../Array";

test('convertStrToArr', () => {
  const result = convertStrToArr("1,2,3");
  expect(result).toEqual([1, 2, 3]);
})
