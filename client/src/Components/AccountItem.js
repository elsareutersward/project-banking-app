import React from 'react';
import './GlobalStyles.css';
import './Accounts.css';
import { Link } from 'react-router-dom';

export const AccountItem = ({ 
  name,
  accountNumber,
  balance,
  currencyCode
}) => {
  return (
    <div className="account-list-item">
      <div className="account-row account-info">
        <div className="account-name">{name}</div>
        <div className="account-number">{accountNumber}</div>
      </div>
      <div className="account-row">
        <div>Balance: {balance} {currencyCode}</div>
        <div
          className="link account-detail"
        > 
          View account details
        </div>
      </div>
    </div>
  );
}