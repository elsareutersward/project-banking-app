import React, { useContext, useEffect } from 'react';
import './GlobalStyles.css';
import './Callback.css';
import { useHistory, useLocation } from 'react-router-dom';
import { BankContext } from '../Providers/BankContext';

const CLIENT_ID = CLIENT_ID //Add your own client id from Tink Link
const loginUrl = `https://link.tink.com/1.0/authorize/?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&market=SE&locale=en_US&scope=accounts:read,investments:read,transactions:read,statistics:read`;

export const Callback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const context = useContext(BankContext);
  const { responseFlags } = useContext(BankContext);
  const history = useHistory();

  const getAccessToken = (codeKey) => {
    context.getAccess(codeKey);
    return;
  };

  useEffect(() => {
    getAccessToken(code);
  }, [code]);

  useEffect(() => {
    if (responseFlags.token && !responseFlags.error) {
      history.push('/finances');
    }
  });

  return (
    <div className="panel callback-panel">
      {responseFlags.loading === true &&
        <div className="callback-panel">
          <div className='callback-title'>Soon there...</div>
          <div className='loading-spinner'></div>
        </div>
      }
      {responseFlags.error &&
        <div className="callback-panel">
          <div className='callback-title'>Failed to log in, try again</div>
          <button 
            className="button login-button"
            type="button" 
            onClick={() => { window.location.href = loginUrl }}
          >
            Log in
          </button>
        </div>
      }
    </div>
  );
}