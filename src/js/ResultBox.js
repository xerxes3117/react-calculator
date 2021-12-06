import React from 'react'

function ResultBox({expression, result, hasError}) {

  return (
    <div className="result-box-container">
      <div className="expression">{expression}</div>
      <div className={"result" + (hasError ? " error" : "")}>
        {hasError ? "Format error" : result} 
      </div>      
    </div>
  )
}

export default ResultBox
