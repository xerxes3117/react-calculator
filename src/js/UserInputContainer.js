import React from 'react'
import { nonNumberOperands, numberOperands, operators, otherOperations } from '../utils/constants'

function UserInputContainer({clickedOnCalculator}) {

  return (
    <div className="user-input-container">

      <section className="left-section">
        <ul className="other-operations">
          {otherOperations.map(val => (
            <li 
              onClick={() => clickedOnCalculator(val, 'other')}
              key={val}
            >{val}</li>
          ))}
        </ul>
        <ul className="operands">
          {[...nonNumberOperands, ...numberOperands].map(val => (
            <li 
              onClick={() => clickedOnCalculator(val, 'operands')}
              key={val}
            >{val}</li>
          ))}
        </ul>
      </section>

      <section className="right-section">
        <ul className="operators">
          {operators.map(val => (
            <li
              onClick={() => clickedOnCalculator(val, 'operator')}
              key={val}
            >{val}</li>
          ))}
        </ul>
      </section>

    </div>
  )
}

export default UserInputContainer
