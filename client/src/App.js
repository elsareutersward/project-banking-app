import React from 'react';
import './Components/GlobalStyles.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LogIn } from './Components/LogIn';
import { FinancialOverview } from './Components/FinancialOverview';
import { Callback } from './Components/Callback';
import { BankContextProvider } from './Providers/BankContext';
import { Accounts } from './Components/Accounts';
import { Investments } from './Components/Investments';
import { Transactions } from './Components/Transactions';
import { Statistics } from './Components/Statistics';

const App = () => {
  return (
    <BankContextProvider>
      <div className="page">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <LogIn />
            </Route>
            <Route path="/finances" exact>
              <FinancialOverview />
            </Route>
            <Route path="/finances/accounts/" exact>
              <Accounts />
            </Route>
            <Route path="/finances/investments/" exact>
              <Investments />
            </Route>
            <Route path="/finances/transactions/" exact>
              <Transactions />
            </Route>
            <Route path="/finances/statistics/" exact>
              <Statistics />
            </Route>
            <Route path="/callback">
              <Callback />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </BankContextProvider>
  );
}

export default App;