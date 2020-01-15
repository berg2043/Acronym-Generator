import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* user() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user', config);
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('error in get user', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', user);
}

export default userSaga;
