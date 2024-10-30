export const ParseAndValidateInputs = (odds, betType, stake) => {
    const parsedOdds = odds.map(odd => parseFloat(odd.price));
    if (parsedOdds.some(isNaN)) {
      alert("Please enter valid numeric odds.");
      return null;
    }
  
    const [select, total] = betType.split('/').map(Number);
    if (isNaN(select) || isNaN(total) || select > total || select < 1 || total < 1) {
      alert("Please enter a valid system type (e.g., '2/3').");
      return null;
    }
  
    const parsedStake = parseFloat(stake);
    if (isNaN(parsedStake) || parsedStake <= 0) {
      alert("Please enter a valid stake amount.");
      return null;
    }
  
    return { parsedOdds, select, parsedStake };
  };