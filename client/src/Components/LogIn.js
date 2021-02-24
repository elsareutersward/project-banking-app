import React from 'react';
import './GlobalStyles.css';
import './LogIn.css';

const CLIENT_ID = CLIENT_ID //Add your own client id from Tink Link
const loginUrl = `https://link.tink.com/1.0/authorize/?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&market=SE&locale=en_US&scope=accounts:read,investments:read,transactions:read,statistics:read`;

export const LogIn = () => {
  return (
    <div className='panel login-panel'>
      <div className='title login-title'>
        Bank App <span role="img" aria-label="emoji">💰</span>
      </div>
      <div className='subtitle login-subtitle'>
        This is a demo app using TinkLink that can help you 
        connect your bank and display your account data, 
        transactions and investments. 
      </div>
      <div className='login-text'>
        Log in to view your financial information 
      </div>
      <button 
        className="button login-button"
        type="button" 
        onClick={() => { window.location.href = loginUrl }}
      >
        Log in
      </button>
    </div>
  );
}