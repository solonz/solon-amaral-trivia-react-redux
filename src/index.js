import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
<<<<<<< HEAD
=======

>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
  document.getElementById('root'),
);
