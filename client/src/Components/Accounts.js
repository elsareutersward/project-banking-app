import React, { useContext} from 'react';
import './GlobalStyles.css';
import './Accounts.css';
import { BankContext } from '../Providers/BankContext';
import { AccountItem } from './AccountItem';
import { Link } from 'react-router-dom';

export const Accounts = () => {
  const { financialData } = useContext(BankContext);

  return (
    <div className="panel">
      <div className="title overview-title">Financial overview</div>
      <div className="overview-toolbar">
        <div className="subtitle">Accounts</div>
        <Link className="link" to="/finances">Go back</Link>
      </div>
      <div className="accounts-list">
        {financialData.response.accountData.accounts.map((account) => (
          <AccountItem
            key={account.accountNumber}
            {...account}
          />
        ))}
      </div>
    </div>
  );
}