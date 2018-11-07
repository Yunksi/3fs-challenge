import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import bucketStore from './stores/BucketStore';

import { App } from './App';

ReactDOM.render(
  <Provider bucketStore={bucketStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

module.hot.accept();
