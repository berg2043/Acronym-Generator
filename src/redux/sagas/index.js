import { all } from 'redux-saga/effects';
import getAcronymsSaga from './getAcronymsSaga';
import registerSaga from './registerSaga';
import loginSaga from './loginSaga';
import userSaga from './userSaga';

export default function* rootSaga(){
  yield all([
    getAcronymsSaga(),
    registerSaga(),
    loginSaga(),
    userSaga(),
  ]);
};