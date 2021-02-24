import React from 'react';
import './GlobalStyles.css';
import './FinancialOverview.css';
import { Link } from 'react-router-dom';

export const FinancialOverview = () => {
  return (
    <div className="panel financial-overview-title-panel">
      <div className="title overview-title">Financial overview</div>
      <div className="financial-overview-list">
        <Link className="financial-overview-list-item" to="/finances/accounts">
          <span className="financial-overview-span" role="img" aria-label="emoji">👛</span>Accounts
        </Link>
        <Link className="financial-overview-list-item" to="/finances/investments">
          <span className="financial-overview-span" role="img" aria-label="emoji">💲</span> Investments
        </Link>
        <Link className="financial-overview-list-item" to="/finances/transactions">
          <span className="financial-overview-span" role="img" aria-label="emoji">💸</span> Transactions
        </Link>
        <Link className="financial-overview-list-item" to="/finances/statistics">
          <span className="financial-overview-span" role="img" aria-label="emoji">🏧</span> Financial overview 2020
        </Link>
      </div>
    </div>
  );
}