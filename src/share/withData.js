import { compose, withState } from "recompose";

export const withBaseData = compose(
  withState("data", "setData", ""),
  withState("binaryData", "setBinaryData", ""),
  withState("args", "setArgs", ""),
  withState("result", "setResult", ""),
  withState("resultRawData", "setResultRawData", ""),
  withState("patterns", "setPatterns",[]),
  withState("results","setResults",[]),
  withState("resultsRawData", "setResultsRawData",[])
)