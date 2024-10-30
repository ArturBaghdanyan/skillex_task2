import React, { useState } from 'react';
import style from './style.module.scss';
import  TotalContainer  from './totalContainer';
import {totalListData} from '../../data/list';
import ResultValue from '../result';
import { ParseAndValidateInputs } from '../../components/validateInput/script';
import { GenerateCombinations } from '../../components/combination/script';


const FormCalculator = () => {
  const [odds, setOdds] = useState(totalListData);
  const [betType, setBetType] = useState('2/3');
  const [stake, setStake] = useState(100);
  const [results, setResults] = useState(null);
  const [selectedCount, setSelectedCount] = useState(2);
  const [resultCount, setResultCount] = useState(null);
  
  const handleCalculate = () => {
    const parsedInputs = ParseAndValidateInputs(odds, betType, stake);
    if (!parsedInputs) return;

    const { parsedOdds, select, parsedStake } = parsedInputs;
    const combinations = GenerateCombinations(parsedOdds, select);

    const stakePerCombination = parsedStake / combinations.length;

    const payouts = combinations.map((combo) => {
      const cumulativeOdds = combo.reduce((acc, odd) => acc * odd, 1);
      const payout = cumulativeOdds * stakePerCombination;
      return { combo, payout };
    });

    const totalReturn = payouts.reduce((acc, item) => acc + item.payout, 0);
    const limitedPayouts = payouts.slice(-resultCount);

    setResults({ payouts: limitedPayouts, totalReturn });
  };
  
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <div className={style.logo}>
        <img src="http://images.lsbet.com/logo/LSbet.com-logo.png" alt="icon" />
      </div>
      <TotalContainer
        odds={odds}
        betType={betType}
        setBetType={setBetType}
        stake={stake}
        setStake={setStake}
        onCalculate={handleCalculate}
        selectedCount={selectedCount} 
        setSelectedCount={setSelectedCount}
      />
     <ResultValue results={results} resultCount={selectedCount}/>
    </div>
  );
};

export default FormCalculator;
