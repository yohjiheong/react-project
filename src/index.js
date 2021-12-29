import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "antd/dist/antd.css";
import {BrowserRouter as Router} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

