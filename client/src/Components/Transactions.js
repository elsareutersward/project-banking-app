import React, { useContext } from 'react';
import './GlobalStyles.css';
import './Transactions.css';
import { BankContext } from '../Providers/BankContext';
import { Link } from 'react-router-dom';

export const Transactions = () => {
  const { financialData } = useContext(BankContext);

  const convertDate = (dateToConvert) => {
    let unix_timestamp = dateToConvert
    const date = new Date(unix_timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime = `${year}-${month.length > 1 ? month : `0${month}`}-${day.length > 1 ? day : `0${day}`} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    
    return formattedTime;
  }

  return (
    <div className="panel">
      <div className="title overview-title">Financial overview</div>
      <div className="overview-toolbar">
        <div className="subtitle">Transactions Jan 2021</div>
        <Link className="link" to="/finances">Go back</Link>
      </div>
      <div className="transactions-list">
        {financialData.response.transactionDataMonth.results.map((result, i) => (
          <div className="transactions-row" key={i}>
            <div>{result.transaction.description}</div>
            <div className="transactions-data">
              <div>{result.transaction.amount} {result.transaction.currencyDenominatedAmount.currencyCode}</div>
              <div>{convertDate(result.transaction.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}