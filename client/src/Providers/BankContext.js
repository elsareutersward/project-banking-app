import React, { createContext, useState } from 'react';

export const BankContext = createContext();

export const BankContextProvider = (props) => {
  const [financialData, setFinancialData] = useState(null);
  const [responseFlags, setResponseFlags] = useState({
    token: null,
    loading: true,
    error: null,
  });

  const getAccess = async (code) => {
    try {
      const response = await  fetch(`/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
  
      const data = await response.json();

      if (response.status === 200) {
        setFinancialData(data)
        setResponseFlags({ loading: false, token: true })
        return;
      }
      return setResponseFlags({ loading: false, error: data.message });
    } catch (error) {
      return setResponseFlags({ loading: false, error: error.toString() })
    }
  }

  const bankContext = {
    financialData,
    responseFlags,
    getAccess,
  };

  return (
    <BankContext.Provider value={bankContext}>
      {props.children}
    </BankContext.Provider>
  );
};