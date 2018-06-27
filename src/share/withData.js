import { compose, withState } from "recompose";

export const withBaseData = compose(
  withState("data", "setData", ""),
  withState("binaryData", "setBinaryData", ""),
  withState("args", "setArgs", ""),
  withState("result", "setResult", ""),
  withState("resultRawData", "setResultRawData", ""),
  withState("patterns", "setPatterns", []),
  withState("results","setResults", []),
  withState("resultsRawData", "setResultsRawData", []),
  withState("zerosRawData", "setZerosRawData", []),
  withState("onesRawData", "setOnesRawData", []),
  withState("twosRawData", "setTwosRawData", []),
  withState("one", "setOne", ""),
  withState("two", "setTwo", ""),
  withState("zero", "setZero", "")
)