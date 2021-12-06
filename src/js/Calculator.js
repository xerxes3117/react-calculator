import React, { useState } from 'react'
import '../css/styles.scss'
import UserInputContainer from './UserInputContainer'
import ResultBox from './ResultBox'
import { numberOperands, operators } from '../utils/constants'

function Calculator() {
  const [currExpression, setCurrentExpression] = useState('')
  const [currResult, setCurrentResult] = useState('')
  const [hasError, setHasError] = useState(false)
  const [currOpenBrackets, setCurrentOpenBrackets] = useState(0)

  /**
   * Function to handle any user input (operators, operands, other operators)
   */
  const userInputHandler = (val, type) => {

    if(type === 'other') {
      handleOtherOperationInput(val)
    } else if(type === 'operator') {
      handleOperatorInput(val)
    } else {
      handleOperandInput(val)
    }

  }

  const handleOtherOperationInput = (val) => {
    let tempExp = currExpression;
    let tempRes = currResult;

    if(val === '='){
      //If eval function throws any error show it in result box
      try {
        tempRes = evaluateExpression()
        tempExp = tempRes.toString()
        setHasError(false)
      } catch(error){
        tempRes = error.message
        setHasError(true)
      }
    } else if(val === 'Del') {
      tempExp = tempExp.slice(0, -1)
    } else if(val === 'AC') {
      tempExp = ''
      tempRes = ''
      setCurrentOpenBrackets(0)
    }

    setCurrentExpression(tempExp)
    setCurrentResult(tempRes)
  }

  const handleOperatorInput = (val) => {
    let tempExp = currExpression;

    tempExp = tempExp + '' + val
    setCurrentExpression(tempExp)
  }

  const handleOperandInput = (val) => {
    let tempExp = currExpression;

    if(val === "( )"){
      if(currOpenBrackets === 0 || tempExp[tempExp.length -1] === '('){
        tempExp += operators.includes(tempExp[tempExp.length -1]) ? '(' : '*(';
        setCurrentOpenBrackets(currOpenBrackets +1)
      } else {
        tempExp += ')';
        setCurrentOpenBrackets(currOpenBrackets -1)
      }
    } else {
      tempExp += '' + val
    }

    setCurrentExpression(tempExp)
  }

  const evaluateExpression = () => {
    if(currOpenBrackets === 0){
      //sanitize the expression
      let sanitizedExp = sanitizeExpression()

      return eval(sanitizedExp) 
    } else {
      setHasError(true)
    }
  }

  /**
   * Remove any unecessary digits/symbols from the expression
   */
  const sanitizeExpression = () => {
    let tempExp = currExpression.split('')
    let isAfterDecimalOrNumber = false;
    let nonZeroOperands = [...numberOperands.filter(d => d !== '0'), '.']

    //Replace leading zero values to avoid being identified as octal values
    for(let i = 0; i < tempExp.length -1; i++) {
      if(i > 0 && nonZeroOperands.includes(tempExp[i])) {
        isAfterDecimalOrNumber = true
      } else {
        isAfterDecimalOrNumber = false
      }
      if(tempExp[i] === '0' && !isAfterDecimalOrNumber && numberOperands.includes(tempExp[i + 1])) {
        tempExp.splice(i, 1)
      }
    }

    return tempExp.join('')
  }

  return (
    <div className="calculator-container">
      <div className="header">
        Calculator
      </div>
      <ResultBox 
        expression={currExpression}
        result={currResult}
        hasError={hasError}
      />
      <UserInputContainer 
        clickedOnCalculator={userInputHandler}
      />
    </div>
  )
}

export default Calculator
