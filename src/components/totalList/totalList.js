import React, { useState } from 'react'
import style from './style.module.scss';

export const TotalList = ({ list, onCalculate, stake, setStake }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [prices, setPrices] = useState(list.reduce((acc, item) => {
    acc[item.id] = item.price; 
    return acc;
  }, {}));


  const handleOptionChange = (id, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleListChange = (id) => (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setPrices((prevPrices) => ({
        ...prevPrices,
        [id]: newValue,
      }));
    }
  };

  const handleStakeChange = (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setStake(newValue);
    }
  };

  return (
    <div className={`${style.calculator_row_main} ${style.right}`}>
      <div className={style.calculator_row_main_head}>
          <label htmlFor="stakeInput">Total Stake</label>
            
          <div className={style.calculator_row_main_head_price}>
            <input
              id="stakeInput"
              type="text"
              value={stake}
              onChange={handleStakeChange}
              min="0"
              step="1"
              className={style.stakeInput}
            />
            <span>EUR</span>
          </div>
      </div>
      
      <div className={style.calculator_row_main_border}></div>

      <div className={style.calculator_row_main_container}>
        <div className={style.calculator_row_main_container_list_head}>
          <span style={{ color: 'white'}}>Correct</span>
          <span style={{ color: 'red'}}>Incorrect</span>
          <span style={{ color: 'yellow'}}>Void</span>
        </div>
        <div className={style.calculator_row_main_container_list}>
          {list.map((item) => (
          <div key={item.id} className={style.calculator_row_main_container_list_item}>
              
            <div className={style.calculator_row_main_container_list_item_first}>
              <span>{item.name}</span>
            </div>

            <div className={style.calculator_row_main_container_list_item_sec}>
                <input 
                  type="text" 
                  value={`${prices[item.id]}.00`}
                  onChange={handleListChange(item.id)}
                  className={style.calculator_row_main_container_list_item_sec_price} 
                />
            
              <div className={style.calculator_row_main_container_list_item_sec_radio}>
              <div className={style.calculator_row_main_container_list_radio}>
                <input
                  type="radio"
                  name={`option-${item.id}`}
                  value="1"
                  defaultChecked
                  onChange={() => handleOptionChange(item.id, "1")}
                />
              </div>
              <div>
              <input
                type="radio"
                name={`option-${item.id}`}
                value="2"
                checked={selectedOptions[item.id] === "2"}
                onChange={() => handleOptionChange(item.id, "2")}
              />
              </div>
              <div>
              <input
                type="radio"
                name={`option-${item.id}`}
                value="3"
                checked={selectedOptions[item.id] === "3"}
                onChange={() => handleOptionChange(item.id, "3")}
              />
              </div>
              </div>
            </div>
            
          </div>
          ))}
        </div>
      </div>

      <div className={style.calculator_row_main_border}></div>

      <div className={style.calculator_row_main_button}>
        <button onClick={onCalculate}>Compute</button>
      </div>
    </div>
  )
}
