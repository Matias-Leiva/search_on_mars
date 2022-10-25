import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRouter from './routes/Routes';

import './assets/styles/reset.css';
import './assets/styles/styles.css';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
