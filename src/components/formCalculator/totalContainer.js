import React from 'react';
import { TotalList } from '../totalList/totalList';
import style from './style.module.scss';
import { totalData } from '../../data/totalData';


const TotalContainer = (props) => {
  const { 
    odds, 
    betType, 
    setBetType, 
    stake, 
    setStake, 
    onCalculate, 
    selectedCount,
    setSelectedCount,
  } = props;

  const handleSystemChange = (event) => {
    const newBetType = event.target.value;
    setBetType(newBetType);
    
    const [select, total] = newBetType.split('/').map(Number);
    const maxItems = select === total ? null : total;
    setSelectedCount(maxItems);
  };


  return (
    <div className={style.calculator}>
      <h2>System Bets Calculator</h2>
      <div className={style.calculator_row}>
        <div className={`${style.calculator_row_column} ${style.left}`}>

          <div className={style.calculator_row_column_system}>
            <div className={style.calculator_row_column_system_text}>
                <span>System</span>
                <select value={betType} onChange={handleSystemChange}>
                {totalData.map((item) => (
                  <option key={item.id} value={item.value}>{item.text}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={style.calculator_row_column_system}>
            <p>A {betType} system contains various combinations.</p>
          </div>
        </div>
        <TotalList 
          list={odds.slice(0, selectedCount)}
          onCalculate={onCalculate} 
          stake={stake} 
          setStake={setStake}
        />
      </div>
    </div>
  );
};

export default TotalContainer;
