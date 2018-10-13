import * as React from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';
import { BallData } from '../share/BallData.jsx';

const wStyle = {
  width: '100%',
  overflowX: 'auto',
};

const zeroStyle = {
  color: 'green',
  overflowX: 'auto',
};

export const ResultData = (props) => {
  const { pattern, resultData, resultRawData, header, eventKey, bsStyle, zeroRawData, oneRawData, twoRawData,
    secondResultsRawData,  secondPatterns, secondResults, secondZeroArr, secondOneArr, secondTwoArr, 
    secondBData, secondBDataZeroArr, secondBDataOneArr, secondBDataTwoArr} = props;
  const contentPattern = pattern ? pattern.join() : "";
  const content = resultData ? resultData.join() : "";
  const contentRaw = resultRawData ? resultRawData.join() : "";
  const contentZero = zeroRawData ? zeroRawData.join() : "";
  const contextOne = oneRawData ? oneRawData.join() : "";
  const contextTwo = twoRawData ? twoRawData.join() : "";
  return (
    <Panel collapsible={true} header={header} eventKey={eventKey} bsStyle={bsStyle} defaultExpanded={true} >
      <div >模板</div>
      <div style={wStyle}>{contentPattern}</div>
      <div></div>
      <div >结果</div>
      <div style={wStyle}>{content}</div>
      <div></div>
      <div>结果对应原始数据</div>
      <div style={wStyle}>{contentRaw}</div>
      <div></div>
      <div >所有0对应原始数据</div>
      <div style={zeroStyle}>{contentZero}</div>
      <div >所有1对应原始数据</div>
      <div style={zeroStyle}>{contextOne}</div>
      {contextTwo && 
        <div>
          <div>所有2对应原始数据</div>
          <div style={zeroStyle}>{contextTwo}</div>
        </div>
      }
      <br></br>
      {secondResultsRawData && 
      <div>第二次计算</div>
      }
      <PanelGroup>
        {
          secondBData && 
          < BallData b={secondBData} zero={secondBDataZeroArr} one={secondBDataOneArr} two={secondBDataTwoArr} header="二进制数据" eventKey={0} bsStyle="success" />
        }       
      </PanelGroup>
      <PanelGroup>
        {secondResultsRawData && secondResultsRawData.length > 0 && secondResultsRawData.map((r, k) => (
          <ResultData 
            pattern={secondPatterns[k]} 
            resultData={secondResults[k]} 
            resultRawData={r} 
            header={"第" + (k + 1) + "次结果"} 
            eventKey={0} 
            bsStyle="info" 
            key={k} 
            zeroRawData={secondZeroArr[k]} 
            oneRawData={secondOneArr[k]} 
            twoRawData={secondTwoArr[k]} 
          />
        ))}
      </PanelGroup>
    </Panel>
  );
}
