import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppContext } from './AppContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
);