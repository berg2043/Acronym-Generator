import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

function* register(action){
  try {
    yield Axios.post('/api/user/register', action.payload);
    yield put({type: 'LOGIN', payload: action.payload});
  } catch (error) {
    console.log('error with registering', error);
  }
}

function* registerSaga(){
  yield takeLatest('REGISTER', register)
}

export default registerSaga;