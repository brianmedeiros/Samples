import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {RandomLine} from './components/SubLine';

ReactDOM.render(
  <App />,
  document.getElementById('chocolateApp')
);
ReactDOM.render(
    <RandomLine />,
    document.getElementById('subLine')
);
registerServiceWorker();
