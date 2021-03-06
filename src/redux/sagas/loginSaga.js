import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

// Logs a user in
function* login(action){
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield Axios.post('/api/user/login', action.payload, config);
    yield put({type: 'FETCH_USER'});
  } catch (error) {
    console.log('error logging in', error);
  }
}

// Logs a user out
function* logout(action){
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield Axios.post('/api/user/logout', config);
    yield put({type: 'REMOVE_USER'})
  } catch (error) {
    console.log('error loggin out', error);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', login);
  yield takeLatest('LOGOUT', logout);
}

export default loginSaga;
