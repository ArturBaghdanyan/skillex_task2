import React from 'react'
import style from './style.module.scss';


const ResultValue = ({results, resultCount}) => {

  return (
    <div>
       {results && (
        <div className={style.results}>
          <h3>System Bets Calculator</h3>
          <div className={style.results_list}>
            <h4>Combinations</h4>
            {results.payouts.slice(0, resultCount).map((result, index) => (
              <p key={index}>
                {result.combo.join('.00 ')} - ${result.payout.toFixed(2)}
              </p>
            ))}
          </div>
          <h4>Total Return: ${results.totalReturn.toFixed(2)}</h4>
        </div>
      )}
    </div>
  )
}

export default ResultValue