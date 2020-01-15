import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
import sagas from './redux/sagas';
import logger from 'redux-logger';
import { Provider } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware,logger)
)

sagaMiddleware.run(sagas)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));