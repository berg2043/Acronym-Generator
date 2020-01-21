import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
import sagas from './redux/sagas';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware,logger)
)

sagaMiddleware.run(sagas)

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#023549'
    },
    secondary: {
      main: '#745200'
    },
    error: {
      main: '#741400'
    },
    warning: {
      main: '#B58715'
    },
    info: {
      main: '#115671'
    },
  }
})

ReactDOM.render(<Provider store={store}><MuiThemeProvider theme={theme}><App /></MuiThemeProvider></Provider>, document.getElementById('root'));