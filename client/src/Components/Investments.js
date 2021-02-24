import React, { useContext } from 'react';
import './GlobalStyles.css';
import './Investments.css';
import { Link } from 'react-router-dom';
import { BankContext } from '../Providers/BankContext';

export const Investments = () => {
  const { financialData } = useContext(BankContext);

  return (
    <div className="panel investments-panel">
      <div className="title overview-title">Financial overview</div>
      <div className="overview-toolbar">
        <div className="subtitle">Investments</div>
        <Link className="link" to="/finances">Go back</Link>
      </div>
      <div className="investments-list">
        {financialData.response.investmentData.portfolios.map((portfolio, i) => (
          <div className="investments-list-item" key={i}>
            <div className="investments-row">
              <span>{portfolio.type}</span>
              <span>Total value of {portfolio.totalValue}</span>
            </div>
            {portfolio.instruments.map((instrument, i) => (
              <div className="investments-info" key={i}>
                <span className="investments-info-name">{instrument.name}</span>
                <span className="investments-info-value">Market value: {instrument.marketValue}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}