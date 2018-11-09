import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import bucketStore from './stores/BucketStore';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { App } from './App';

library.add(faTimes);

ReactDOM.render(
  <Provider bucketStore={bucketStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

module.hot.accept();
