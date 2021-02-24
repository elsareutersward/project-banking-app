import React, { useContext, useEffect, useState } from 'react';
import './GlobalStyles.css';
import './Statistics.css'
import { Link } from 'react-router-dom';
import { BankContext } from '../Providers/BankContext';
import Logo from '../Assets/ica-logo.svg';

export const Statistics = () => {
  const { financialData } = useContext(BankContext);
  const [favouriteMerchant, setFavouriteMerchant] = useState([]);
  const transactionsList = financialData.response.transactionDataYear.results.map((result) => (result.transaction.description));

  useEffect(() => {
    if (transactionsList.length === 0) {
      return;
    }
    
    const merchantsList = {};
    let mostFrequentMerchant = 1;
    let favouriteMerchants = [];

    for (var i = 0; i < transactionsList.length; i++) {
      const merchant = transactionsList[i];
  
      if (!merchantsList[merchant]) {
        merchantsList[merchant] = 1;
      } else {
        merchantsList[merchant]++;
      }

      if (merchantsList[merchant] > mostFrequentMerchant) {
        favouriteMerchants = [merchant];
        mostFrequentMerchant = merchantsList[merchant];
      } else if (merchantsList[merchant] === mostFrequentMerchant) {
        favouriteMerchants.push(merchant);
      }
    }
    setFavouriteMerchant(favouriteMerchants);
  }, []);

  const favouriteMerchantCost = (merchant) => {
    const expenses = financialData.response.transactionDataYear.results.filter(result => result.transaction.categoryType === 'EXPENSES')
    const favourite = expenses.filter(expense => expense.transaction.description === merchant)
    const transactionsAtFavourite = favourite.map(result => Math.abs(result.transaction.amount))
    const transactionsAmount = transactionsAtFavourite.reduce((a, b) => a + b, 0)
    return transactionsAmount.toFixed(0);
  }

  return (
    <div className="panel">
      <div className="title overview-title">Financial overview</div>
      <div className="overview-toolbar">
        <div className="subtitle">Your financial overview 2020</div>
        <Link className="link" to="/finances">Go back</Link>
      </div>
      <div className="statistics-merchants">
        <div className="subtitle statistics-subtitle">{`Your favourite ${favouriteMerchant.length > 1 ? 'merchants' : 'merchant'}:`}</div>
          {(favouriteMerchant.length < 1)
            ? (<div>No favourite found</div>)
            : (<div>
              {favouriteMerchant.map((merchant, i) => (
                <div className="statistics-merchant"  key={i}>
                  <img src={Logo} alt="Merchant Logo" />
                  <div className="title statistics-cost">{favouriteMerchantCost(merchant)} kr</div>
                  <div className="statistics-merchant-text">During 2020 your most visited merchant was {merchant} where you spent {favouriteMerchantCost(merchant)} kr</div>
                </div>
              ))}
            </div>)
          }
      </div>
      <div className="statistics-summary-year">
        <div className="subtitle statistics-subtitle">How much did you spend each month?</div>
        {(financialData.response.transactionDataYear.periodAmounts.length < 1)
          ? (<div className="statistics-error">No data to display</div>)
          : (<div className="statistics-summary-year-list">
            {financialData.response.transactionDataYear.periodAmounts.map((period, i) => (
              <div className="statistics-row" key={i}>
                <span>{period.key}</span>
                <span>{period.value.toFixed(2)}</span>
              </div>
            ))}
          </div>)
        }
        
      </div>
    </div>
  );
}