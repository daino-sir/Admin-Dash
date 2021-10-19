import index from "./js/index";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./js/store/index";
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render((
  <Provider store ={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
