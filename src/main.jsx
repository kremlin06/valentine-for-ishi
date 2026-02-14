import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Easter egg console message
console.log(
  '%c💝 I love you more than clean code, Ishi',
  'color: #FF006E; font-size: 20px; font-family: "Great Vibes", cursive; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);'
);

console.log(
  '%c✨ Happy Valentine\'s Day, my love ✨',
  'color: #3A86FF; font-size: 16px; font-family: Inter, sans-serif;'
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
