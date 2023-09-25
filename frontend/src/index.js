// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

ReactDOM.render(
  <Router> {/* Wrap your App component with BrowserRouter */}
    <App />
  </Router>,
  document.getElementById('root')
);
