import { all } from 'redux-saga/effects';
import getAcronymsSaga from './getAcronymsSaga';

export default function* rootSaga(){
  yield all([
    getAcronymsSaga(),
  ]);
};